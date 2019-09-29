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
        const isMember = project.userEmail !== email;
        const obj = {
          name: project.name,
          boards: project.boards,
          members: project.members,
          created_at: project.created_at,
          isMember,
        };
        return obj;
      });
      console.log(result, 'result');
      return result;
    })
    .catch((err) => {
      throw new respond.InternalError(err);
    });
}

export async function getProject(name, req) {
  const { email } = req.jwt;
  return Projects.findOne({ name }).populate('boards', ['comments', 'name', 'created_at'])
    .then((project) => {
      const isMember = project.userEmail !== email;
      const obj = {
        name: project.name,
        boards: project.boards,
        members: project.members,
        isMember,
      };
      return obj;
    })
    .catch((err) => {
      throw new respond.InternalError(err);
    });
}
