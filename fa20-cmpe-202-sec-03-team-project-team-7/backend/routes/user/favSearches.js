const express = require('express');

const router = express.Router();
const auth = require('../../middleware/userAuth');
const FavSearch = require('../../models/FavSearchModel');

router.get('/:id', auth, async (req, res) => {
  try {

    let favSearch = await FavSearch.find({_id: req.params.id});
    res.status(200);
    res.json(favSearch);

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.post('/searchEmail', auth, async (req, res) => {
  const {email} = req.body;
  try {

    let favSearches = await FavSearch.find({email: email});
    console.log(favSearches);
    res.status(200);
    res.json(favSearches);

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.post('/', auth, async (req, res) => {

  console.log('entered post api');

  try {

    let search = await FavSearch.findOne(req.body);

    if (search) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Already favorited this search' }] });
    }
    
    search = new FavSearch(req.body);
  
    //  2. save to database
    await search.save();
    console.log('success');
    res.status(200).send('Added favorite search');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/', auth, async (req, res) => {
  const { id } = req.body;

  try {

    let search = await FavSearch.findById(id);

    if (!search) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Cant unfavorite search, hasnt been favorited' }] });
    }
    
    //  2. Delete Listing
    FavSearch.findByIdAndDelete(id, function (err) {
        if(err) console.log(err);
        console.log("Successful unfavorite");
    });
  
    res.status(200).send('successfully unfavorited');  

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;