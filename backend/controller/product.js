const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");

router.post(
  "/create-product",
  isSeller,
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopId } = req.body;

      if (!shopId || String(req.seller._id) !== String(shopId)) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      const files = req.files || [];
      const productData = {
        ...req.body,
        images: files.map((file) => file.filename),
        shop,
      };
      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return next(new ErrorHandler(error.message, 400));
      }
      return next(error);
    }
  })
);

module.exports = router;
