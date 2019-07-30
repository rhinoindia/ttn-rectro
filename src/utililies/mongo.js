const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/rectro';

module.exports.connectToServer = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Mongo is Running');
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};
