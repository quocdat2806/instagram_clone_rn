const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./jwtService");
const middleware = require("../middleware/index.js");
class AuthService {
  async createUser(data) {
    const decodedString = await middleware.decodeData(data.data);
    const parseToObj = JSON.parse(decodedString);
    const { email = "", phone = "", passWord = "" } = parseToObj;
    const passwordHash = bcrypt.hashSync(passWord, 10);
    return new Promise(async (resolve, reject) => {
      try {
        const isAlreadyAuth = await User.findOne({
          $or: [{ email }, { phone }],
        });
        if (!isAlreadyAuth) {
          const accessToken = generateAccessToken(parseToObj);
          const refreshToken = generateRefreshToken(parseToObj);
          await User.create({
            ...parseToObj,
            passWord: passwordHash,
            refreshToken,
          });
          resolve({
            access_token: accessToken,
            refresh_token: refreshToken,
            status: true,
          });
        } else {
          reject({
            message: "The email or phone is have already",
            status: false,
          });
        }
      } catch (error) {
        console.log(error);

        reject({
          message: "Have error when create user",
          status: false,
        });
      }
    });
  }
  async loginUser(payload) {
    const decodedString = await middleware.decodeData(payload.data);
    const parseToObj = JSON.parse(decodedString);
    const { email = "", phone = "", passWord = "" } = parseToObj;
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({
          $or: [{ email }, { phone }],
        });
        if (user) {
          const comparePasswords = bcrypt.compareSync(passWord, user.passWord);
          if (comparePasswords) {
            const accessToken = generateAccessToken(parseToObj);
            resolve({
              access_token: accessToken,
              refresh_token: user.refreshToken,
              status: true,
            });
          } else {
            reject({
              message: " Password is not correct",
              status: false,
            });
          }
        } else {
          reject({
            message: "Account or password not correct",
            status: false,
          });
        }
      } catch (error) {
        reject({
          message: "Have error when login",
          status: false,
        });
      }
    });
  }
}
module.exports = new AuthService();
