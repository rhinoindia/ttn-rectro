/* eslint-disable no-console */
import Crypto from 'crypto';
import * as UserService from '../services/UserService';
import * as respond from '../../utililies/respond';

export function ispasswordAndUserMatch(req, res, next) {
  return UserService.findByEmail(req.body.email)
    .then((user) => {
      if (!user) {
        throw new respond.BadRequestError('Invalid User');
      } else {
        const passwordFields = user.password.split('$');
        const salt = passwordFields[0];
        const hash = Crypto.createHmac('sha512', salt)
          .update(req.body.password).digest('base64');
        if (hash === passwordFields[1]) {
          req.body = {
            // eslint-disable-next-line no-underscore-dangle
            userId: user._id,
            name: user.name,
            email: user.email,
            provider: 'email',
          };
          console.log(req.body, 'userrrrrrr');
          return next();
        // eslint-disable-next-line no-else-return
        } else {
          throw new respond.BadRequestError('Invalid email or Password');
        }
      }
    });
//   console.log(user, 'middleware');
}

export function more() {

}
