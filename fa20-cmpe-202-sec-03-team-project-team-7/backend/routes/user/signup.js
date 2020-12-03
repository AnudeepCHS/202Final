const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/UserModel');

router.post('/', async (req, res) => {
  console.log(req.body);

  const { name, email, password, userType } = req.body;

  try {
    //  1. Query to check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exits' }] });
    }

    //  2. Create User
    user = new User({
      name,
      email,
      password,
      userType,
    });

    //  3. If user does not exist, hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //  4. save to database
    await user.save();
    console.log('success');
    res.status(200).send('User successfully created');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;