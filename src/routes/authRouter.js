const express = require("express");
const authRouter = express.Router();
const middleware = require("../middleware");

const authController = require("../controllers/authController");
const jwtController = require("../controllers/jwtController");
const { Token } = require("../enum");

authRouter.post("/signup", authController.createUser);
authRouter.post("/signin", authController.loginUser);
authRouter.post(
  "/refreshToken",
  (req, res, next) =>
    middleware.verifyToken(req, res, next, Token.REFRESH_TOKEN),
  jwtController.refreshToken
);
module.exports = authRouter;
