const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id) {
  return ObjectId.isValid(id);
}
module.exports = {isValidObjectId};
