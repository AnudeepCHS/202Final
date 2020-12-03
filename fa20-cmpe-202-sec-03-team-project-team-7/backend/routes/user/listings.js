const express = require('express');

const router = express.Router();
const auth = require('../../middleware/userAuth');
const Property = require('../../models/PropertyModel');
const User = require('../../models/UserModel');

router.post('/myListings', auth, async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({email: email});
    if ((user.userType != 'seller') && (user.userType != 'landlord')) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Buyer and renter do not have listings' }] });
    }

    //  1. Query to retrieve listings
    let listings = await Property.find({ ownerEmail: email },function (err) {
        if(err) console.log(err);
    }); 

    res.status(200);
    res.json(listings);

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {

    //  1. Query to retrieve listing
    let listing = await Property.findById(req.params.id, function(err) {
        if(err) console.log(err);
        console.log("Successful retrieve");
    }); 

    res.status(200);
    res.json(listing);

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.post('/', auth, async (req, res) => {
  const { street, city, state, zipCode, propertyType, ownerEmail, price, sqFt, bedrooms, bathrooms, flooring, parking, yearBuilt,
  securityDeposit, visitDate } = req.body;

  console.log(req.body);

  try {
    console.log(ownerEmail);
    let user = await User.findOne({email: ownerEmail});
    console.log(user.userType);
    if ((user.userType != 'seller') && (user.userType != 'landlord')) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Buyer and Renter cannot create listings' }] });
    }
      
    //  1. Create Listing
    property = new Property({
      street, city, state, zipCode, propertyType, ownerEmail, price, sqFt, bedrooms, bathrooms, flooring, parking, yearBuilt,
      securityDeposit, visitDate, 
    });
  
    //  2. save to database
    await property.save();
    console.log('success');
    res.status(200).send('Listing successfully created');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.put('/', auth, async (req, res) => {
  const { id, street, city, state, zipCode, propertyType, ownerEmail, price, sqFt, bedrooms, bathrooms, flooring, parking, yearBuilt,
    securityDeposit, visitDate } = req.body;

  try {
    let user = await User.findOne({email: ownerEmail});
    if ((user.userType != 'seller') && (user.userType != 'landlord')) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Buyer and Renter cannot update listings' }] });
    }

    //  1. Query to check if listing exists
    let property = await Property.findById(id);

    if (!property) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Specified listing does not exist' }] });
    }
   
    //  2. Update Listing
    Property.findByIdAndUpdate(id, req.body, function (err) {
        if(err) console.log(err);
        console.log("Successful Update");
    }); 

    res.status(200).send('Listing successfully updated');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/', auth, async (req, res) => {
  console.log("entered delete");
  const { id, ownerEmail} = req.body;

  console.log(req.body);
  try {
    let user = await User.findOne({email: ownerEmail});
    if ((user.userType != 'seller') && (user.userType != 'landlord')) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Buyer and Renter cannot remove listings' }] });
    }

    //  1. Query to check if listing exists
    let property = await Property.findById(id);

    if (!property) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Specified listing does not exist' }] });
    }
   
    //  2. Delete Listing
    Property.findByIdAndDelete(id, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
    });
  
    res.status(200).send('Listing successfully removed');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.post('/search', async (req, res) => {
  let { street, city, state, zipCode, propertyType, minPrice, maxPrice, minSqFt,
    maxSqFt, minBedrooms, maxBedrooms, minBathrooms, maxBathrooms, flooring, parking} = req.body;

  if (typeof minPrice == 'undefined') minPrice = 0;
  if (typeof maxPrice == 'undefined') maxPrice = Infinity;
  if (typeof minSqFt == 'undefined') minSqFt = 0;
  if (typeof maxSqFt == 'undefined') maxSqFt = Infinity;
  if (typeof minBedrooms == 'undefined') minBedrooms = 0;
  if (typeof maxBedrooms == 'undefined') maxBedrooms = Infinity;
  if (typeof minBathrooms == 'undefined') minBathrooms = 0;
  if (typeof maxBathrooms == 'undefined') maxBathrooms = Infinity;

  let q = {}
  if (street) q.street = street;
  if (city) q.city = city;
  if (state) q.state = state;
  if (zipCode) q.zipCode = zipCode;
  if (propertyType) q.propertyType = propertyType;
  if (flooring) q.flooring = flooring;
  if (parking) q.parking = parking;
  q.price = {$gte: minPrice, $lte: maxPrice};
  q.sqFt = {$gte: minSqFt, $lte: maxSqFt};
  q.bedrooms = {$gte: minBedrooms, $lte: maxBedrooms};
  q.bathrooms = {$gte: minBathrooms, $lte: maxBathrooms};

  try {

    let listings = await Property.find(q, function (err) {
      if(err) console.log(err);
    }); 

    res.status(200);
    res.json(listings);

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;