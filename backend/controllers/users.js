const Users = require('../models/users');

function getUserById(id) {
  return Users.findById(id);
}
function getAllUsers() {
  return Users.find({});
}

module.exports = { getUserById, getAllUsers };
