const path = require("path");

if (
  process.env.NODE_ENV !== "PRODUCTION" &&
  process.env.NODE_ENV !== "production"
) {
  require("dotenv").config({
    path: path.join(__dirname, "config", ".env"),
  });
}

const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
