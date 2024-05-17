// POST user LogIn.
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const userControllers = require('../controllers/user-controllers');

// routes.

/* Add validation for this route. */
router.post('/login',
[
   check('email').normalizeEmail().isEmail(),
],
 userControllers.login);

module.exports = router;