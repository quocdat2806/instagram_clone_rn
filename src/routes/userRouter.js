const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const { uploadVideoMulter, uploadImageMulter } = require("../config");
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
userRouter.post("/follow", middleware.verifyToken, userController.following);
userRouter.post("/comment/:id", middleware.verifyToken, userController.comment);

module.exports = userRouter;
