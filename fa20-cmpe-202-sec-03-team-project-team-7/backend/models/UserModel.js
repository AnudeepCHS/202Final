const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum : ['renter', 'landlord', 'buyer', 'seller', 'realtor'], required: true },
  favHomes: { type: Array }, default: {},
  status: { type: String, enum : ['active', 'deactivated'], required: true, default: 'active' },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
