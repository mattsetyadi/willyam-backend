const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controller/auth');
const { requireSignIn } = require('../middleware/auth');
const User = require('../models/user');

// @route   POST /signup
// @desc    Register user
// @access  Public
router.post('/signup', signup);

// @route   POST /signin
// @desc    Login user
// @access  Private
router.post('/signin', signin);

// @route   GET /user
// @desc    Get user information from token
// @access  Public
router.get('/user', requireSignIn, async (req, res) => {
  try {
    const user = await await User.findById(req.user._id).select(
      '-hash_password',
    );
    // console.log(user);
    res.json(user);
    // res.json('done');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
