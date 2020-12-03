const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Admin = require('../../models/AdminModel');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. See if Admin exists
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
  
      // 2. Match admin's password matches
      const isMatch = await bcrypt.compare(password, admin.password);
  
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
  
      // 3. return jsonWebToken
      const payload = {
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      };
  
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '10 hours' },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            id: admin.id,
            name: admin.name,
            email: admin.email,
          });
        },
      );
    } catch (err) {
      console.log(err.message);
      res.send(500).send('Server Error');
    }
  });

module.exports = router;