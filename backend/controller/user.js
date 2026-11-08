const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide your email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const passwordMatches = await user.comparePassword(password);
    if (!passwordMatches) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    return sendToken(user, 200, res);
  })
);

router.post(
  "/create-user",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const uploadedFile = req.files?.file?.[0] || req.files?.avatar?.[0];

      const userEmail = await User.findOne({ email });

      if (userEmail) {
        if (uploadedFile) {
          const filename = path.basename(uploadedFile.filename);
          const filePath = path.join(__dirname, "../uploads", filename);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
              return next(new ErrorHandler("Error deleting file", 500));
            }
            return next(new ErrorHandler("User already exists", 400));
          });
          return;
        }
        return next(new ErrorHandler("User already exists", 400));
      }

      const user = {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        ...(uploadedFile && {
          avatar: {
            public_id: path.basename(uploadedFile.filename),
            url: path.basename(uploadedFile.filename),
          },
        }),
      };

      const activationToken = createActivationToken(user);
      const frontendUrl =
        req.get("origin") ||
        process.env.FRONTEND_URL ||
        "http://localhost:5173";
      const activationUrl = `${frontendUrl}/activation/${activationToken}`;

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `Please check your email:- ${user.email} to activate your account!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
