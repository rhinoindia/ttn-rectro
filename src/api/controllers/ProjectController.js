/* eslint-disable no-console */
import Shuttle from '../../utililies/shuttle';
import * as respond from '../../utililies/respond';
import * as ProjectService from '../services/ProjectService';
// import * as UserService from '../services/UserService';
import { authenticateToken } from '../middlewares/authentication';
import { required } from '../../utililies/validation';

export function create(req, res, next) {
  const validationMember = ['email'];
  const validationProject = ['name', 'members'];
  const { members } = req.body;
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(() => authenticateToken(req, res, next))
    .then(() => Shuttle.liftSideEffectFunction(req.body, required, validationProject))
    .then(() => Shuttle.liftEffectArrayOfObject(members, required, validationMember))
    // .then(() => UserService.addMembers(members))
    .then(() => ProjectService.add(req, res, next))
    .then(data => respond.send200(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}

export function getProjects(req, res, next) {
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(() => authenticateToken(req, res, next))
    .then(() => ProjectService.getProjects(req, res, next))
    .then(data => respond.send200(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}

export function getProject(req, res, next) {
  const { name } = req.params;
  return Promise.resolve(Shuttle.liftRequest(req))
    .then(() => authenticateToken(req, res, next))
    .then(() => ProjectService.getProject(name, req))
    .then(data => respond.send200(req, res, data))
    .catch(err => respond.sendError(req, res, err));
}
