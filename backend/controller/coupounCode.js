const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCode");

const router = express.Router();

router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const { name } = req.body;
    const existingCoupon = await CoupounCode.findOne({ name });

    if (existingCoupon) {
      return next(new ErrorHandler("Coupoun code already exists!", 400));
    }

    req.body.shop = req.seller;

    try {
      const coupounCode = await CoupounCode.create(req.body);

      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      if (error.code === 11000) {
        return next(new ErrorHandler("Coupoun code already exists!", 400));
      }
      if (error.name === "ValidationError") {
        return next(new ErrorHandler(error.message, 400));
      }
      return next(error);
    }
  })
);

router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    if (String(req.seller._id) !== String(req.params.id)) {
      return next(new ErrorHandler("You cannot view these coupons", 403));
    }

    const couponCodes = await CoupounCode.find({
      "shop._id": req.params.id,
    });

    res.status(201).json({
      success: true,
      couponCodes,
    });
  })
);

router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res) => {
    const couponCode = await CoupounCode.findOne({
      name: req.params.name.trim(),
    });

    res.status(200).json({
      success: true,
      couponCode,
    });
  })
);

module.exports = router;
