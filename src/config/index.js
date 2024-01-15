var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var express = require("express");
const { connectToDb } = require("../db");
const router = require("../routes");

const cloudinary = require("cloudinary").v2;
async function setUpServer(app) {
  try {
    await connectToDb();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());

    router(app);
  } catch (err) {
    console.error("https support is disabled!");
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_CLOUD_KEY,
  api_secret: process.env.API_CLOUD_SECRET,
  secure: true,
});

module.exports = {
  setUpServer,
  cloudinary,
};
