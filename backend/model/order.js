const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cart: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  subTotalPrice: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentInfo: {
    type: mongoose.Schema.Types.Mixed,
  },
  status: {
    type: String,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
