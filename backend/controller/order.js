const express = require("express");
const Order = require("../model/order");
const Product = require("../model/product");
const Event = require("../model/event");
const CoupounCode = require("../model/coupounCode");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-order",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const {
      cart,
      shippingAddress,
      couponCode: couponName,
      paymentInfo,
    } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return next(new ErrorHandler("Your cart is empty", 400));
    }
    if (
      !shippingAddress ||
      !shippingAddress.country ||
      !shippingAddress.city ||
      !shippingAddress.address1 ||
      !shippingAddress.zipCode
    ) {
      return next(new ErrorHandler("Shipping address is incomplete", 400));
    }

    const shopItemsMap = new Map();
    for (const item of cart) {
      const itemId = item._id || item.id;
      const quantity = Number(item.qty || 1);
      if (
        !mongoose.Types.ObjectId.isValid(itemId) ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return next(new ErrorHandler("Cart item is invalid", 400));
      }

      const product =
        (await Product.findById(itemId)) || (await Event.findById(itemId));
      if (!product) {
        return next(new ErrorHandler("A cart item is no longer available", 400));
      }
      if (quantity > product.stock) {
        return next(
          new ErrorHandler(`Insufficient stock for ${product.name}`, 400)
        );
      }

      const shopId = String(product.shopId);
      const trustedItem = {
        ...product.toObject(),
        qty: quantity,
      };
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(trustedItem);
    }

    const shopSubtotals = [...shopItemsMap.entries()].map(([shopId, items]) => ({
      shopId,
      items,
      subTotalPrice: items.reduce(
        (sum, item) =>
          sum +
          Number(item.qty || 1) *
            Number(item.discountPrice ?? item.discount_price ?? item.price ?? 0),
        0
      ),
    }));
    const calculatedSubtotal = shopSubtotals.reduce(
      (sum, shop) => sum + shop.subTotalPrice,
      0
    );
    if (calculatedSubtotal <= 0) {
      return next(new ErrorHandler("Order total is invalid", 400));
    }

    let coupon = null;
    let couponShopId = null;
    let discountPrice = 0;
    if (couponName) {
      coupon = await CoupounCode.findOne({ name: couponName });
      if (!coupon) {
        return next(new ErrorHandler("Coupon code doesn't exists!", 400));
      }
      couponShopId = String(coupon.shop?._id || coupon.shopId || "");
      const eligibleShop = shopSubtotals.find(
        (shop) => shop.shopId === couponShopId
      );
      if (!eligibleShop) {
        return next(
          new ErrorHandler("Coupon code is not valid for this shop", 400)
        );
      }
      if (
        coupon.minAmount != null &&
        eligibleShop.subTotalPrice < Number(coupon.minAmount)
      ) {
        return next(
          new ErrorHandler(
            `Minimum eligible amount is ${coupon.minAmount}`,
            400
          )
        );
      }
      discountPrice =
        (eligibleShop.subTotalPrice * Number(coupon.value)) / 100;
      if (coupon.maxAmount != null) {
        discountPrice = Math.min(discountPrice, Number(coupon.maxAmount));
      }
    }

    const shipping = 10;
    const orders = [];
    for (const shop of shopSubtotals) {
      const shopShipping = (shipping * shop.subTotalPrice) / calculatedSubtotal;
      const shopDiscount =
        couponShopId && couponShopId === shop.shopId
          ? discountPrice
          : 0;
      const order = await Order.create({
        cart: shop.items,
        shippingAddress,
        user: req.user._id,
        shopId: shop.shopId,
        subTotalPrice: shop.subTotalPrice,
        shipping: shopShipping,
        discountPrice: shopDiscount,
        totalPrice: Math.max(
          0,
          shop.subTotalPrice + shopShipping - shopDiscount
        ),
        paymentInfo: paymentInfo || { type: "cash-on-delivery" },
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
      totalPrice: orders.reduce((sum, order) => sum + order.totalPrice, 0),
    });
  })
);

module.exports = router;
