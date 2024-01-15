const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const { uploadVideoMulter, uploadImageMulter } = require("../helper");
const middleware = require("../middleware");

userRouter.post(
  "/createPost",
  middleware.verifyToken,
  uploadImageMulter.single("image"),
  userController.createPost
);
userRouter.post(
  "/createVideo",
  middleware.verifyToken,
  uploadVideoMulter.single("video"),

  userController.createVideo
);
module.exports = userRouter;
