const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Product = require("../model/product");
const Shop = require("../model/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");

router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res) => {
    const products = await Product.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      products,
    });
  })
);

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

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;
    const productData = await Product.findById(productId);

    if (!productData) {
      return next(new ErrorHandler("Product not found with this id!", 404));
    }

    if (String(productData.shopId) !== String(req.seller._id)) {
      return next(new ErrorHandler("You cannot delete this product", 403));
    }

    const uploadsDirectory = path.resolve(__dirname, "../uploads");
    await Promise.all(
      (productData.images || []).map((image) => {
        if (typeof image !== "string" || path.basename(image) !== image) {
          throw new ErrorHandler("Invalid product image path", 400);
        }

        const filePath = path.join(uploadsDirectory, image);

        return new Promise((resolve, reject) => {
          fs.unlink(filePath, (error) => {
            if (error && error.code !== "ENOENT") {
              reject(error);
              return;
            }
            resolve();
          });
        });
      })
    );

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found with this id!", 404));
    }

    res.status(201).json({
      success: true,
      message: "Product Deleted successfully!",
    });
  })
);

module.exports = router;
