var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var express = require("express");
const { connectToDb } = require("../db/index.js");
const router = require("../routes");
const { limiter } = require("../config/index.js");
require("../firebase");
const dotenv = require("dotenv");
const { sendMail } = require("../../src/services/sendMail.js");
async function setUpServer(app) {
  try {
    dotenv.config();
    await connectToDb();
    app.use(limiter);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    router(app);
  } catch (err) {
    console.error("https support is disabled!");
  }
}

module.exports = {
  setUpServer,
};
