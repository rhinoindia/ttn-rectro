import express from 'express';

import * as projectController from '../api/controllers/ProjectController';

const projectRouter = express.Router();

projectRouter.post('/create', projectController.create);
projectRouter.get('/', projectController.getProjects);
projectRouter.get('/:name', projectController.getProject);


// for multiple methods for single route
function testFunction(req, res) {
  res.send('works fine');
  // eslint-disable-next-line no-console
  console.log('works fine');
}
projectRouter.route('/test')
  .get(testFunction)
  .post(testFunction);

export default projectRouter;
