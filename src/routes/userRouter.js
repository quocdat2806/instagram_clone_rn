const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const {
  configUploadVideoMulter,
  configUploadImageMulter,
} = require("../config");
const middleware = require("../middleware");
userRouter.post(
  "/createPost",
  middleware.verifyToken,
  configUploadImageMulter.single("image"),
  userController.createPost
);
userRouter.post(
  "/createVideo",
  middleware.verifyToken,
  configUploadVideoMulter.single("video"),
  userController.createVideo
);
userRouter.post(
  "/follow/:id",
  middleware.verifyToken,
  userController.addFollow
);
userRouter.post(
  "/comment/:id",
  middleware.verifyToken,
  userController.addComment
);
userRouter.post("/like/:id", middleware.verifyToken, userController.addLike);
userRouter.get(
  "/comment/:id",
  middleware.verifyToken,
  userController.getComment
);

module.exports = userRouter;
