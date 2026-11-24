const express = require("express");
const router = express.Router();
const Shop = require("../model/shop");
const Event = require("../model/event");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const unlinkUploadedFiles = require("../utils/unlinkUploadedFiles");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");

router.post(
  "/create-event",
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

      const eventData = {
        ...req.body,
        images: (req.files || []).map((file) => file.filename),
        shop,
      };
      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        product: event,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return next(new ErrorHandler(error.message, 400));
      }
      return next(error);
    }
  })
);

router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res) => {
    const events = await Event.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      events,
    });
  })
);

router.get(
  "/get-all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find();

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const eventId = req.params.id;
    const eventData = await Event.findById(eventId);

    if (!eventData) {
      return next(new ErrorHandler("Event not found with this id!", 404));
    }

    if (String(eventData.shopId) !== String(req.seller._id)) {
      return next(new ErrorHandler("You cannot delete this event", 403));
    }

    await unlinkUploadedFiles(eventData.images || []);

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return next(new ErrorHandler("Event not found with this id!", 404));
    }

    res.status(201).json({
      success: true,
      message: "Event Deleted successfully!",
    });
  })
);

module.exports = router;
