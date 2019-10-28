const { Schema }, mongoose = require('mongoose');

const User = new Schema({
  firstname: { type: String, required: true, unique: true },
  lastname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: Number
});
module.exports = mongoose.model('User', User)