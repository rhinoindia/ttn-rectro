/* eslint-disable no-console */
import Projects from '../models/Projects.model';
import * as respond from '../../utililies/respond';
import sendEmail from '../../utililies/emailer';
import ProjectInvitation from '../../templates/projectInvitation';

export function add(req) {
  const projectData = req.body;
  projectData.userEmail = req.jwt.email;
  const Project = new Projects(projectData);
  return Project.save()
    .then(() => {
      const template = new ProjectInvitation(projectData);
      sendEmail(template);
      return projectData;
    })
    .catch((error) => { throw new respond.HandleMongoError(error); });
}

export function findByEmail() {
}
