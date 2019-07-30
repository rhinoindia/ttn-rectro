const mongoose = require('mongoose');
const UsersSchema = require('./Users.schema');

module.exports = mongoose.model('Users', UsersSchema);
