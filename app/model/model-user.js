const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
});

module.exports = mongoose.model('users-templates', userSchema);
