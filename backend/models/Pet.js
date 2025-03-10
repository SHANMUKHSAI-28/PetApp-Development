const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'other'],
  },
  breed: String,
  age: {
    value: Number,
    unit: {
      type: String,
      enum: ['months', 'years'],
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  images: [{
    type: String,
    required: true,
  }],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  services: {
    forSale: {
      type: Boolean,
      default: true,
    },
    forMating: Boolean,
    forBoarding: Boolean,
  },
  health: {
    vaccinated: Boolean,
    documents: [{
      type: String,
    }],
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for location-based queries
petSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Pet', petSchema); 