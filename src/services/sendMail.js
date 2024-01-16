const { oAuth2Client } = require("../config");
const nodemailer = require("nodemailer");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  REFRESH_TOKEN,
} = require("../proxy");

const sendMail = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      host: "dath33503@gmail.com",
      service: "gmail",
      setMaxListeners: 10000,
      port: 3000,
      secure: false,
      auth: {
        type: "OAuth2",
        user: "dath33603@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        redirectUrl: REDIRECT_URL,
        accessToken: accessToken,
      },
    });
    const info = await transporter.sendMail({
      from: '"DAT2K3 👻" <dath33603@gmail.com>"',
      to: "dattqph28614@fpt.edu.vn",
      subject: "Hello ✔",
      text: "Em yêu ngủ ngon nha ... ",
    });
    console.log("info", info);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendMail };
