import projectRouter from './project.router';

import authRouter from './auth.router';

import boardRouter from './board.router';

const express = require('express');

const indexRouter = express.Router();

/* GET home page. */
indexRouter.use('/', authRouter);
indexRouter.use('/projects', projectRouter);
indexRouter.use('/board', boardRouter);

// for multiple methods for single route
function testFunction(req, res) {
  res.send('works fine');
  // eslint-disable-next-line no-console
  console.log('works fine');
}
indexRouter.route('/test')
  .get(testFunction)
  .post(testFunction);

export default indexRouter;
