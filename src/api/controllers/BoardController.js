/* eslint-disable no-console */
// import * as validator from '../../utililies/validation';
import Shuttle from '../../utililies/shuttle';
import * as respond from '../../utililies/respond';
import * as Service from '../services/BoardService';
import { authenticateToken } from '../middlewares/authentication';
import { required } from '../../utililies/validation';
// import { addMember } from '../../utililies/helpers';

export function createBoard(req, res, next) {
  const validationBoard = ['name', 'projectName'];
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(() => authenticateToken(req, res, next))
    .then(() => Shuttle.liftSideEffectFunction(req.body, required, validationBoard))
    .then(() => Service.add(req, res, next))
    .then(data => respond.send200(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}

export function createComment(req, res, next) {
  const validationBoard = ['columnId', 'message', 'boardId'];
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(() => authenticateToken(req, res, next))
    .then(() => Shuttle.liftSideEffectFunction(req.body, required, validationBoard))
    .then(() => Service.addComments(req))
    .then(data => respond.send200(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}

export function updateComment(req, res, next) {
  const validationBoard = ['columnId', 'message', 'boardId', 'commentId'];
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(() => authenticateToken(req, res, next))
    .then(() => Shuttle.liftSideEffectFunction(req.body, required, validationBoard))
    .then(() => Service.updateComments(req))
    .then(data => respond.send200(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}

export function getBoard(req, res, next) {
  const { name } = req.params;
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(() => authenticateToken(req, res, next))
    .then(() => Service.get(name))
    .then(data => respond.send200(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}

export function deleteComment(req, res, next) {
  const validationBoard = ['boardId', 'commentId'];
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(() => authenticateToken(req, res, next))
    .then(() => Shuttle.liftSideEffectFunction(req.body, required, validationBoard))
    .then(() => Service.deleteComment(req))
    .then(data => respond.send200(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}
