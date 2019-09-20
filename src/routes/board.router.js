import express from 'express';

import * as BoardController from '../api/controllers/BoardController';

const boardRouter = express.Router();

boardRouter.post('/create', BoardController.createBoard);
boardRouter.post('/comment', BoardController.createComment);
boardRouter.post('/comment/update', BoardController.updateComment);
boardRouter.get('/:name', BoardController.getBoard);

// for multiple methods for single route
function testFunction(req, res) {
  res.send('works fine');
  // eslint-disable-next-line no-console
  console.log('works fine');
}
boardRouter.route('/test')
  .get(testFunction)
  .post(testFunction);

export default boardRouter;
