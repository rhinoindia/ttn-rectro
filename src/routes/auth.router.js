import express from 'express';

import * as authController from '../api/controllers/AuthController';

const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/signup', authController.signup);

// for multiple methods for single route
function testFunction(req, res) {
  res.send('works fine');
  // eslint-disable-next-line no-console
  console.log(authController.login);
}
authRouter.route('/test')
  .get(testFunction)
  .post(testFunction);

export default authRouter;
