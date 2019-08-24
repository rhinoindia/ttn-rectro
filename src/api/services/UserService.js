/* eslint-disable no-console */
import Crypto from 'crypto';
import Users from '../models/Users.model';
import * as respond from '../../utililies/respond';


export function insert(data) {
  const salt = Crypto.randomBytes(16).toString('base64');
  const hash = Crypto.createHmac('sha512', salt)
    .update(data.password)
    .digest('base64');
  const userData = {
    ...data,
    password: `${salt}$${hash}`,
  };
  const User = new Users(userData);
  return User.save()
    .then(() => userData)
    .catch((error) => { throw new respond.HandleMongoError(error); });
}

export function findByEmail(email) {
  return Users.findOne({ email })
    .then(user => user);
}
