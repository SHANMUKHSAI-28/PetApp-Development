const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { petId, amount } = req.body;

      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: `order_${Date.now()}`
      };

      const razorpayOrder = await razorpay.orders.create(options);

      const order = new Order({
        buyer: req.user.uid,
        pet: petId,
        amount,
        razorpayOrderId: razorpayOrder.id
      });

      await order.save();

      res.json({
        success: true,
        order: razorpayOrder
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  verifyPayment: async (req, res) => {
    try {
      const { 
        razorpayOrderId, 
        razorpayPaymentId, 
        razorpaySignature 
      } = req.body;

      const sign = razorpayOrderId + "|" + razorpayPaymentId;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

      if (razorpaySignature === expectedSign) {
        await Order.findOneAndUpdate(
          { razorpayOrderId },
          { 
            status: 'paid',
            razorpayPaymentId,
            razorpaySignature
          }
        );

        res.json({
          success: true,
          message: "Payment verified successfully"
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid signature"
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({ buyer: req.user.uid })
        .populate('pet')
        .populate('seller', 'profile.firstName profile.lastName email');

      res.json({
        success: true,
        orders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = orderController; 