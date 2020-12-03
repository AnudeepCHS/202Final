const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/UserModel');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. See if User exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
  
      // 2. Match user's password matches
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
  
      // 3. return jsonWebToken
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          status: user.status
        },
      };
  
      console.log(payload);
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '10 hours' },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            status: user.status
          });
        },
      );
    } catch (err) {
      console.log(err.message);
      res.send(500).send('Server Error');
    }
  });

module.exports = router;