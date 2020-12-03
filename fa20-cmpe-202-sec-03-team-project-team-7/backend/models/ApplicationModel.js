const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  propertyId: {type: String, required: true},
  applierName: {type: String, required: true},
  applierEmail: {type: String, required: true},
  reviewerEmail: {type: String, required: true},
  offer: { type: Number },
  credit: { type: Number },
  employer: {type: String },
  status: { type: String, enum : ['pending', 'approved', 'rejected'], default: 'pending' },
});

const Application = mongoose.model('application', ApplicationSchema);
module.exports = Application;
