const mongoose = require('mongoose');

const FavSearchSchema = new mongoose.Schema({
  email: { type: String, required: true },
  street: {type: String },
  city: {type: String },
  state: {type: String },
  zipCode: { type: String },
  propertyType: { type: String, enum : ['apartment', 'townhouse', 'attached', 'detached'] },
  minPrice: { type: Number},
  maxPrice: { type: Number},
  minSqFt: { type: Number},
  maxSqFt: { type: Number},
  minBedrooms: { type: Number},
  maxBedrooms: { type: Number},
  minBathrooms: { type: Number},
  maxBathrooms: { type: Number},
  flooring: { type: String, enum : ['carpet', 'wooden'] },
  parking: { type: String, enum : ['open', 'closed', 'none'] },
});

const FavSearch = mongoose.model('favSearch', FavSearchSchema);
module.exports = FavSearch;
