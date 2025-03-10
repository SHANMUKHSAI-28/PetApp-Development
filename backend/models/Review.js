const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Update vendor rating when a review is added
reviewSchema.post('save', async function() {
  const Vendor = mongoose.model('User');
  const reviews = await this.constructor.find({ vendor: this.vendor });
  const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  await Vendor.findByIdAndUpdate(this.vendor, {
    'vendor.rating': avgRating.toFixed(1)
  });
});

module.exports = mongoose.model('Review', reviewSchema); 