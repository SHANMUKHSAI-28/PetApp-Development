const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['boarding', 'grooming', 'training', 'veterinary'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    amount: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ['per_day', 'per_session', 'per_visit'],
      required: true,
    },
  },
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
  availability: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    },
    slots: [{
      startTime: String,
      endTime: String,
      capacity: Number,
    }],
  }],
  images: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

serviceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Service', serviceSchema); 