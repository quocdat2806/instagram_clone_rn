const express = require("express");
const authRouter = express.Router();
const middleware = require("../middleware");

const authController = require("../controllers/authController");
const jwtController = require("../controllers/jwtController");

authRouter.post("/signup", authController.createUser);
authRouter.post("/signin", authController.loginUser);
authRouter.post(
  "/refreshToken",
  middleware.verifyRefreshToken,
  jwtController.refreshToken
);
module.exports = authRouter;
