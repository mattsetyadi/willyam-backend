const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    await user.save();

    res.status(201).json({
      message: 'Pendaftaran berhasil',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    if (user) {
      if (user.authenticate(password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: 36000,
        });
        const { _id, firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            fullName,
            email,
            role,
          },
        });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Server error',
    });
  }
};
