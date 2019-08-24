/* eslint-disable no-console */
import Crypto from 'crypto';
import mongoose from 'mongoose';
import UserModel from '../models/Users.model';
import * as respond from '../../utililies/respond';

export function insert(data, res) {
  console.log(data, 'datatatatatatatatat');
  const salt = Crypto.randomBytes(16).toString('base64');
  const hash = Crypto.createHmac('sha512', salt)
    .update(data.password)
    .digest('base64');
  const userData = {
    ...data,
    password: `${salt}$${hash}`,
  };
  const User = new UserModel(userData);
  return User.save()
    .then(user => console.log(user))
    .catch(error => respond.handleMongoError(data, res, error));
}
export function ispasswordAndUserMatch(req, res) {
  console.log(req, 'res');
  const User = mongoose.model('Users');
  User.findOne({ email: req.email }, (err, user) => {
    let userData = null;
    console.log(err, 'error');
    if (err) {
      respond.send401(req, res, err);
    } else {
      console.log(user, 'users datatatat');
      userData = user;
    }
    return userData;
  });
}
