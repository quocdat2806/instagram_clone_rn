const { User } = require("../models/user");

async function findUserInfo(auth) {
  const { email, phone } = auth;
  const user = await User.findOne({
    $or: [{ email }, { phone }],
  });
  return user;
}

async function getResultProgressUpload(result) {
  return {
    urlFile: result.secure_url,
    assetId: result.asset_id,
    publicId: result.public_id,
  };
}

async function getDevicesToken() {
  let devicesToken = [];
}

module.exports = {
  findUserInfo,
  getResultProgressUpload,
  getDevicesToken,
};
