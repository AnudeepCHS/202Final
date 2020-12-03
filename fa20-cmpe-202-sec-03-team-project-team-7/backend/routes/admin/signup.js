const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Admin = require('../../models/AdminModel');

router.post('/', async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;

  try {
    //  1. Query to check if admin exists
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Admin already exits' }] });
    }

    //  2. Create Admin
    admin = new Admin({
      name,
      email,
      password,
    });

    //  3. If admin does not exist, hash the password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    //  4. save to database
    await admin.save();
    console.log('success');
    res.status(200).send('Admin successfully created');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;