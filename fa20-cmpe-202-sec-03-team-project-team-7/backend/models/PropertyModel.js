const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  street: {type: String, required: true },
  city: {type: String, required: true },
  state: {type: String, required: true },
  zipCode: { type: String, required: true },
  propertyType: { type: String, enum : ['apartment', 'townhouse', 'attached', 'detached'], required: true },
  ownerEmail: {type: String, required: true},
  price: { type: Number, required: true },
  sqFt: { type: Number, required: true },
  bedrooms: { type: Number, required: true},
  bathrooms: { type: Number, required: true},
  flooring: { type: String, enum : ['carpet', 'wooden'] },
  parking: { type: String, enum : ['open', 'closed', 'none'] },
  yearBuilt: { type: Number },
  securityDeposit: {type: Number },
  visitDate: { type: Date },
  dateListed: {type: Date, default: Date.now },
  dateSold: {type: Date },
});

const Property = mongoose.model('property', PropertySchema);
module.exports = Property;
