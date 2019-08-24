/* eslint-disable no-console */
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/rectro';

const dbService = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log('Mongo is Running'))
    .catch(error => console.log(error));
};

export default dbService;
