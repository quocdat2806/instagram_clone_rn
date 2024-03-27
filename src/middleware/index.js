const crypto = require("crypto");
const { readSslKey } = require("../helper");

const jwt = require("jsonwebtoken");
const { Token } = require("../enum");
class Middleware {
  verifyToken(req, res, next, type = Token.ACCESS_TOKEN) {
    const secretKey =
      type === Token.ACCESS_TOKEN
        ? process.env.ACCESS_TOKEN_KEY
        : process.env.REFRESH_TOKEN_KEY;

    const token = req.headers.token.split(" ")[1];
    if (token) {
      jwt.verify(token, secretKey, (err, data) => {
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

  async decodeData(encodedData) {
    const sslKey = readSslKey();
    const { privateKey } = sslKey;
    const decoded = crypto.privateDecrypt(
      privateKey,
      Buffer.from(encodedData, "base64")
    );

    return decoded.toString();
  }
}

module.exports = new Middleware();
