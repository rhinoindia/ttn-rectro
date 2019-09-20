/* eslint-disable no-console */
import Projects from '../models/Projects.model';
import * as respond from '../../utililies/respond';
import sendEmail from '../../utililies/emailer';
import ProjectInvitation from '../../templates/projectInvitation';

export async function findByName(name) {
  return Projects.findOne({ name })
    .then(project => project);
}

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

export async function getProjects(req) {
  const { email } = req.jwt;
  return Projects.find({ $or: [{ userEmail: email }, { members: { email } }] })
    .then((projects) => {
      const result = projects.map((project) => {
        const { name } = project;
        const isMember = project.userEmail !== email;
        const obj = { name, isMember };
        return obj;
      });
      console.log(result, 'result');
      return result;
    })
    .catch((err) => {
      throw new respond.InternalError(err);
    });
}

export async function getProject(name) {
  return Projects.findOne({ name }).populate('boards', 'name')
    .then(project => project)
    .catch((err) => {
      throw new respond.InternalError(err);
    });
}
