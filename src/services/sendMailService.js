const { oAuth2Client } = require("../config");
const nodemailer = require("nodemailer");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  REFRESH_TOKEN,
} = require("../data_private");

const sendMail = async (email) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      host: process.env.USERNAME_NODEMAILER,
      service: "gmail",
      setMaxListeners: 100000000000000,
      port: process.env.PORT,
      secure: false,
      auth: {
        type: "OAuth2",
        user: process.env.USERNAME_NODEMAILER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        redirectUrl: REDIRECT_URL,
        accessToken: accessToken,
      },
    });
    const info = await transporter.sendMail({
      from: '"DAT2K3 👻" <dath33603@gmail.com>"',
      to: email,
      subject: "Hello ✔",
      text: "Anh hung ban phim 2k3 ",
    });
    console.log("info", info);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendMail };
