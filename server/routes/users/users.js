const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById } = require('../../controllers/users');
const { isValidObjectId } = require('../../helpers/ObjectIdValidator');

/* GET users by their ids. */
router.get('/:id', async function(req, res) {
  //  Validate the id provided to know if it is a valid mongoose id type and not just a random string
  if (isValidObjectId(req.params.id)) {
    const user = await getUserById(req.params.id);
    res.status(200).json({ success: true, data: user });
  }
});

module.exports = router;
