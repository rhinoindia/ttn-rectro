/* eslint-disable no-console */
import Crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Buffer } from 'buffer';
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
        }
        throw new respond.BadRequestError('Invalid email or Password');
      }
    });
}

export function generateToken(req) {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const refreshKey = req.body.userId + secretKey;
    const salt = Crypto.randomBytes(16).toString('base64');
    const hash = Crypto.createHmac('sha512', salt)
      .update(refreshKey).digest('base64');
    const expiresIn = process.env.JWT_TOKEN_EXPIRE;
    console.log(expiresIn, 'expire in');
    const accessToken = jwt.sign(req.body, secretKey, { expiresIn });
    const refreshToken = Buffer.from(hash).toString('base64');
    const result = { accessToken, refreshToken };
    return result;
  } catch (err) {
    throw new respond.InternalError(err);
  }
}

export function authenticateToken(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    const secretKey = process.env.JWT_SECRET_KEY;
    try {
      req.jwt = jwt.verify(authorization, secretKey);
      return next();
    } catch (err) {
      if (err.message === 'jwt expired') {
        throw new respond.ForbiddenError(err);
      } else {
        throw new respond.UnauthorizedError(err);
      }
    }
  } else {
    throw new respond.UnauthorizedError();
  }
}

export function basicAuthLogin(req, res, next) {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    throw new respond.UnauthorizedError('Missing Authorization Header');
  }
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');
  req.body = { email, password };
  return next();
}
