/* eslint-disable no-console */
import httpStatusCodes from './HttpStatusCodes';

export function InternalError(err, prop) {
  this.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
  if (err && err.message) {
    this.message = err.message;
    this.stack = err.stack;
  } else {
    this.message = err || 'Internal server error';
    this.stack = (new Error()).stack;
  }
  this.property = prop;
}
InternalError.prototype = Object.create(Error.prototype);
InternalError.prototype.constructor = InternalError;

export function NotFoundError(err, prop) {
  this.statusCode = httpStatusCodes.NOT_FOUND;
  if (err && err.message) {
    this.message = err.message;
    this.stack = err.stack;
  } else {
    this.message = err || 'Not found';
    this.stack = (new Error()).stack;
  }
  this.property = prop;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = InternalError;

export function ForbiddenError(err, prop) {
  this.statusCode = httpStatusCodes.FORBIDDEN;
  if (err && err.message) {
    this.message = err.message;
    this.stack = err.stack;
  } else {
    this.message = err || 'Forbidden';
    this.stack = (new Error()).stack;
  }
  this.property = prop;
}

ForbiddenError.prototype = Object.create(Error.prototype);
ForbiddenError.prototype.constructor = InternalError;


export function BadRequestError(err, prop) {
  this.statusCode = httpStatusCodes.BAD_REQUEST;
  if (err && err.message) {
    this.message = err.message;
    this.stack = err.stack;
  } else {
    this.message = err || 'Bad request';
    this.stack = (new Error()).stack;
  }
  this.property = prop;
}

BadRequestError.prototype = Object.create(Error.prototype);
BadRequestError.prototype.constructor = InternalError;


export function send401(req, res, err) {
  res.status(httpStatusCodes.UNAUTHORIZED);
  const error = err || {};
  if (error.message) {
    error.message = err.message ? err.message : 'Unauthorized user';
  }
  return res.send(error);
}

export function send403(req, res, err) {
  res.status(httpStatusCodes.FORBIDDEN);
  const error = err || {};
  if (error.message) {
    error.message = err.message ? err.message : 'Forbidden request';
  }
  return res.send(error);
}

export function send400(req, res, err) {
  res.status(httpStatusCodes.BAD_REQUEST);
  const error = err || {};
  if (error.message) {
    error.message = err.message ? err.message : 'Bad request';
  }
  return res.send(error);
}

export function send404(req, res, err) {
  res.status(httpStatusCodes.NOT_FOUND);
  const error = err || {};
  console.log(error, 'errorrrrr');
  if (error.message) {
    error.message = err.message ? err.message : 'Resource requested does not exist';
  }
  return res.send(error);
}

export function send200(req, res, json) {
  res.status(httpStatusCodes.SUCCESS);
  return res.json(json || {});
}

export function sendError(req, res, err) {
  if (err && err.statusCode) res.status(err.statusCode);
  return res.send(err || {});
}

export function send500(req, res, err) {
  res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
  const error = err || {};
  if (error.message) {
    error.message = err.message ? err.message : 'Some error occurred';
  }
  return res.send(error);
}

export function getError(req, err) {
  const errorObj = Object.assign({}, err);
  let error;
  if (typeof err === 'object' && err !== null) {
    if (err.message && err.message.stack) {
      errorObj.message = err.message.stack;
    }
    error = JSON.stringify(errorObj);
  } else {
    error = err;
  }
  return `on ${req.originalUrl} giving error : "${error}"`;
}

export function HandleMongoError(err) {
  if (err.name === 'MongoError' && err.code === 11000) {
    this.statusCode = httpStatusCodes.BAD_REQUEST;
    const name = err.errmsg.match(/"([^']+)"/);
    this.message = name ? `${name[1]} is already exist` : 'There was a duplicate key error';
    this.stack = (new Error()).stack;
  }
}
