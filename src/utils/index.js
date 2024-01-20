const { User } = require("../models/user");

async function FindUserInfo(auth) {
  const { email, phone } = auth;
  const user = await User.findOne({
    $or: [{ email }, { phone }],
  });
  return user;
}

module.exports = {
  FindUserInfo,
};
