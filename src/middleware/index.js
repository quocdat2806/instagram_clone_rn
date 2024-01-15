const crypto = require("crypto");
const fs = require("fs");
const { readSslKey } = require("../helper");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
class Middleware {
  verifyToken(req, res, next) {
    const token = req.headers.token.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, data) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication failed",
          });
        }
        res.locals.data = data;

        next();
      });
    } else {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
  }

  verifyRefreshToken(req, res, next) {
    const refreshToken = req.headers.token.split(" ")[1];
    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, data) => {
        if (err) {
          return res.status(401).json({
            message: "RefreshToken  failed",
          });
        }
        res.locals.data = data;
        next();
      });
    } else {
      return res.status(401).json({
        message: "RefreshToken  failed",
      });
    }
  }
  async decodeData(endcodedData) {
    const sslKey = await readSslKey();
    const { privateKey } = sslKey;
    const decoded = crypto.privateDecrypt(
      privateKey,
      Buffer.from(endcodedData, "base64")
    );

    return decoded.toString();
  }
}

module.exports = new Middleware();
