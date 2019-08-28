/* eslint-disable no-console */
// import * as validator from '../../utililies/validation';
import Shuttle from '../../utililies/shuttle';
import * as respond from '../../utililies/respond';
import * as ProjectService from '../services/ProjectService';
import * as UserService from '../services/UserService';
import { authenticateToken } from '../middlewares/authentication';
// import { addMember } from '../../utililies/helpers';

export function create(req, res, next) {
//   const validation = ['email', 'password'];
  console.log('test project route');
  return Promise.resolve(Shuttle.liftData(req.body))
    .then(() => authenticateToken(req, res, next))
    .then(() => UserService.addMembers(req.body.members))
    .then(() => ProjectService.add(req, res, next))
    .then(data => respond.send200(req, res, data))
    .then(() => console.log('send email'))
    .catch(err => respond.sendError(req, res, err));
}

export function name() {

}
