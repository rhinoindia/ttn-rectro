/* eslint-disable no-console */
import Users from '../models/Users.model';
import * as respond from '../../utililies/respond';
import { createPassword, missingFieldsGenrator } from '../../utililies/helpers';
import sendMail from '../../utililies/emailer';
import TempPassword from '../../templates/tempPassword';

export function findByEmail(email) {
  return Users.findOne({ email })
    .then(user => user);
}

export function add(data) {
  const userData = { ...data };
  userData.password = createPassword(userData.password);
  const User = new Users(userData);
  const resData = {
    ...userData,
  };
  delete resData.password;
  return User.save()
    .then(() => resData)
    .catch((error) => { throw new respond.HandleMongoError(error); });
}

export function addMembers(members) {
  const UserData = members.map(member => findByEmail(member.email).then((user) => {
    console.log(user, 'cheking user data');
    if (!user) {
      const userData = missingFieldsGenrator(member.email);
      const template = new TempPassword(userData);
      sendMail(template);
      return add(userData);
    }
    return {};
  }));


  return Promise.all(UserData).then((results) => {
    console.log(results, 'promise all then');
  }).catch((err) => { throw new respond.NotFoundError(err); });
}
