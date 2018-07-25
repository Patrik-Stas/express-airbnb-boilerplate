const mongoose = require('mongoose');

const User = mongoose.model('users-templates'); // pull out Model class from mongoose

module.exports.userExists = async function userExists(username) {
  return !!(await User.findOne({ username }));
};

module.exports.addUser = async function addUser(username, email) {
  if (!await module.exports.userExists(username)) {
    return (new User({ username, email })).save();
  }
  throw new Error(`User with username ${username} already exists`);
};

module.exports.getUsers = async function getUsers() {
  return User.find();
};
