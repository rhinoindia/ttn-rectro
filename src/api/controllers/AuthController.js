/* eslint-disable no-console */
import * as validator from '../../utililies/validation';
import Shuttle from '../../utililies/shuttle';
import * as respond from '../../utililies/respond';
import * as UserService from '../services/UserService';
import { ispasswordAndUserMatch } from '../middlewares/authentication';

export function login(req, res, next) {
  const validation = ['email', 'password'];
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(data => Shuttle.liftSideEffectFunction(data, validator.required, validation))
    .then(() => ispasswordAndUserMatch(req, res, next))
    .then(() => respond.send200(req, res, req.body))
    .catch(err => respond.sendError(req, res, err));
}

export function signup(req, res) {
  const validation = ['name', 'email', 'password'];
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(data => Shuttle.liftSideEffectFunction(data, validator.required, validation))
    .then(data => UserService.insert(data, res))
    .then(data => respond.send200(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}
