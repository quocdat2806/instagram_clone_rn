const {
  uploadFilesToCloudinary,
  uploadVideoToCloudinary,
} = require("../helper");
const { Video } = require("../models/video");
const { User } = require("../models/user");
class UserService {
  async createPost(payload, auth) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, phone } = auth;
        const user = await User.findOne({
          $or: [{ email }, { phone }],
        });
        console.log("User found", user);
        const result = await uploadFilesToCloudinary(payload.file);
        const urlFile = result.secure_url;
        const assetsId = result.assets_id;
        const publicId = result.public_id;
        const postItem = {
          urlFile,
          assetsId,
          publicId,
        };
        await Post.create({
          postImages: [postItem],
          userId: user._id,
          content: payload.content,
        });
        resolve({ message: "Create post  success", status: true });
      } catch (error) {
        console.log(error);
        reject({
          message: "Have error when create post",
          status: false,
        });
      }
    });
  }

  async createVideo(payload, auth) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, phone } = auth;
        const user = await User.findOne({
          $or: [{ email }, { phone }],
        });
        const result = await uploadVideoToCloudinary(payload.path);

        const urlFile = result.secure_url;
        const assetsId = result.assets_id;
        const publicId = result.public_id;
        const videoItem = {
          urlFile,
          assetsId,
          publicId,
        };
        await Video.create({
          videos: [videoItem],
          userId: user._id,
          content: payload.content,
        });
        resolve({ message: "Create video  success", status: true });
      } catch (error) {
        reject({
          message: "Have error when create video",
          status: false,
        });
      }
    });
  }
}
module.exports = new UserService();
