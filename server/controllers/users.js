const Users = require('../models/users');

/* Get User by their id */
function getUserById(id) {
  return Users.findById(id);
}

/* Get list of entire users from the database */
function getAllUsers() {
  return Users.find({});
}

module.exports = { getUserById, getAllUsers };
