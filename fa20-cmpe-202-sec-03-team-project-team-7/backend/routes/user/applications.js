const express = require('express');

const router = express.Router();
const auth = require('../../middleware/userAuth');
const Application = require('../../models/ApplicationModel');
const Property = require('../../models/PropertyModel');
const User = require('../../models/UserModel');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
      user: 'homeapp1539874298@gmail.com',
      pass: ',R%,jm8E',
  },
  secure: true,
});


router.get('/:id', auth, async (req, res) => {
  console.log("entered application get");

  try {

    //  1. Query to check if application exists
    let app = await Application.findById(req.params.id);
    console.log(app);

    if (!app) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Application does not exist' }] });
    }
      
    res.status(200);
    res.json(app);

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.post('/', auth, async (req, res) => {
  const { applierName, propertyId, applierEmail, reviewerEmail, offer, credit, employer } = req.body;

  const mailData = {
      from: 'homeapp1539874298@gmail.com',
      to: reviewerEmail,
      subject: 'Home Application',
      text: '',
      html: '<b>Hello there,<br><br>You have received an application on property ' + propertyId + '<br><br>From ' + applierEmail + '<br/>',
  };

  transporter.sendMail(mailData, (error, info) => {
      if (error) {
          return console.log(error);
      }
      res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });


  try {
    let user = await User.findOne({email: applierEmail});
    if ((user.userType != 'buyer') && (user.userType != 'renter')) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Seller and landlord cannot submit applications' }] });
    }

    user = await User.findOne({email: reviewerEmail});
    if ((user.userType != 'landlord') && (user.userType != 'seller')) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Renter and buyer cannot review applications' }] });
    }

    //  1. Query to check if listing exists
    let property = await Property.findById(propertyId);
    console.log(property);

    if (!property) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Listing does not exist' }] });
    }
      
    //  2. Create application
    application = new Application({
        applierName, propertyId, applierEmail, reviewerEmail, offer, credit, employer
    });
  
    //  3. save to database
    await application.save();
    console.log('success');
    res.status(200).send('Application successfully submitted');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});


router.post('/searchEmail', auth, async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({email: email});
    if ((user.userType != 'seller') && (user.userType != 'landlord')) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Buyer and renter cannot review applications' }] });
    }

    //  1. Query to retrieve applications
    let applications = await Application.find({ reviewerEmail: email },function (err) {
        if(err) console.log(err);
        console.log("Successful retrieve");
    }); 

    res.status(200);
    res.json(applications);

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.put('/review', auth, async (req, res) => {
  const { id, status } = req.body;

  try {
    //  1. Update Application
    Application.findByIdAndUpdate(id, {status: status}, function (err) {
        if(err) console.log(err);
        console.log("Successful Update");
    }); 

    res.status(200).send('Successfully reviewed application');

  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;