const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const { uploadVideo, uploadImage } = require("../helper");
const middleware = require("../middleware");

userRouter.post(
  "/createPost",
  middleware.verifyToken,
  uploadImage.single("image"),
  userController.createPost
);
userRouter.post(
  "/createVideo",
  middleware.verifyToken,
  uploadVideo.single("video"),

  userController.createVideo
);
module.exports = userRouter;
