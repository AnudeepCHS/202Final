const express = require('express');

const router = express.Router();
const auth = require('../../middleware/userAuth');
const Property = require('../../models/PropertyModel');
const User = require('../../models/UserModel');

router.get('/:id', auth, async (req, res) => {

  try {
    let user = await User.findById(req.params.id);

    let favHomes = await Property.find({_id: user.favHomes});

    res.status(200);
    res.json(favHomes);

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  console.log(req.params.id);

  try {

    let user = await User.findOne({email: email});

    //  1. Query to check if property exists
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Listing does not exist' }] });
    }

    // 2. Check if user has already favorited
    if ((user.favHomes).includes(req.params.id)) {
        return res
        .status(400)
        .json({ errors: [{ msg: 'Already favorited' }] });
    }
    
    user.favHomes.push(req.params.id);
  
    //  2. save to database
    await user.save();
    console.log('success');
    res.status(200).send('Added favorite home');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/', auth, async (req, res) => {
  const { id, email } = req.body;

  try {

    let user = await User.findOne({email: email});

    //  1. Query to check if property exists
    let property = await Property.findOne({ _id: id });

    if (!property) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Listing already exists' }] });
    }

    // 2. Check if this has been favorited
    if (!(user.favHomes).includes(id)) {
        return res
        .status(400)
        .json({ errors: [{ msg: 'Cant unfavorite, has not been favorited' }] });
    }

    user.favHomes.pull(id);
  
    //  2. save to database
    await user.save();
    console.log('success');
    res.status(200).send('Removed favorite home');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;