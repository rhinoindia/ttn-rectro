/* eslint-disable no-console */
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dbService from './utililies/mongo';
import indexRouter from './routes/index';
import corsConfig from './api/middlewares/cors';

const Dotenv = require('dotenv');

const logger = require('morgan');

const app = express();

// added env valiables in process.env
if (process.env.NODE_ENV !== 'production') Dotenv.config();

app.use(cors(corsConfig));

// establish connection with mongo
dbService();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v0', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  if (!req.route) next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// eslint-disable-next-line no-console
console.log('Node is running on http://localhost:8000');
module.exports = app;
