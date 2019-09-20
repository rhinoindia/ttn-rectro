/* eslint-disable no-console */
import { required } from '../../utililies/validation';
import Shuttle from '../../utililies/shuttle';
import * as respond from '../../utililies/respond';
import * as UserService from '../services/UserService';
import * as auth from '../middlewares/authentication';

export function login(req, res, next) {
  // const validation = ['email', 'password'];
  return Promise.resolve(Shuttle.liftData(req.body))
    // .then(data => Shuttle.liftSideEffectFunction(data, required, validation))
    .then(() => auth.basicAuthLogin(req, res, next))
    .then(() => auth.ispasswordAndUserMatch(req, res, next))
    .then(() => auth.generateToken(req, res, next))
    .then(data => respond.send200(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}

export function signup(req, res) {
  const validation = ['name', 'email', 'password'];
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(data => Shuttle.liftSideEffectFunction(data, required, validation))
    .then(data => UserService.add(data, 'USER'))
    .then(data => respond.send201(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}

export function test(req, res, next) {
  const validation = ['name'];
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(data => Shuttle.liftSideEffectFunction(data, required, validation))
    .then(() => auth.authenticateToken(req, res, next))
    .then(() => respond.send201(req, res, req.jwt))
    .catch(err => respond.sendError(req, res, err));
}
