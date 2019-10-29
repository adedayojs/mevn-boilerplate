const express = require('express');
const router = express.Router();
const userRoutes = require('./users/users')


/* Link different endpoints to their respective route handlers */

router.use('/user', userRoutes)

module.exports = router;
