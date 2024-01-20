var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var express = require("express");
const { connectToDb } = require("../db/index.js");
const router = require("../routes");
const { configLimiter } = require("../config/index.js");
require("../firebase");
const dotenv = require("dotenv");
async function setUpServer(app) {
  try {
    dotenv.config();
    connectToDb();
    app.use(configLimiter);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    router(app);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  setUpServer,
};
