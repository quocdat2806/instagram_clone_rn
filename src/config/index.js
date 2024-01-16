"use strict";
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { rateLimit } = require("express-rate-limit");
const { google } = require("googleapis");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  REFRESH_TOKEN,
} = require("../proxy");
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_CLOUD_KEY,
  api_secret: process.env.API_CLOUD_SECRET,
  secure: true,
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
const uploadImageMulter = multer({
  storage: multer.memoryStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
const uploadVideoMulter = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

module.exports = {
  cloudinary,
  uploadImageMulter,
  uploadVideoMulter,
  limiter,
  oAuth2Client,
};
