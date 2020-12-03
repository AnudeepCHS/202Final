const express = require('express');

const router = express.Router();
const auth = require('../../middleware/userAuth');
const User = require('../../models/UserModel');

router.get('/', auth, async (req, res) => {
  try {
    let users = await User.find({});

    res.status(200);
    res.json(users);

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
  
      res.status(200);
      res.json(user);
  
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  });

router.put('/:id', auth, async (req, res) => {
  console.log("entered put");
  try {   
    //  1. Update User
    User.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if(err) console.log(err);
        console.log("Successful Update");
    }); 

    res.status(200).send('User successfully updated');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
   
    //  1. Delete Listing
    User.findByIdAndDelete(req.params.id, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
    });
  
    res.status(200).send('Listing successfully removed');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;