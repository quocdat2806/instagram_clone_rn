const jwtService = require("../services/jwtService");

class JwtController {
  refreshToken(_, res) {
    try {
      const payload = res.locals.data.payload;
      const accessToken = jwtService.generateAccessToken(payload);
      return res.status(200).json({ access_token: accessToken });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}

module.exports = new JwtController();
