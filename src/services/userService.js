const {
  uploadFilesToCloudinary,
  uploadVideoToCloudinary,
} = require("../helper");
const { Video } = require("../models/video");
const { User } = require("../models/user");
const { Post } = require("../models/post");
const { getMessaging } = require("../firebase/index.js");
const { response } = require("express");
const { TYPE_POST } = require("../../constants/index.js");
class UserService {
  async createPost(payload, auth) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, phone } = auth;
        const user = await User.findOne({
          $or: [{ email }, { phone }],
        });
        const result = await uploadFilesToCloudinary(payload.file);
        const urlFile = result.secure_url;
        const assetId = result.asset_id;
        const publicId = result.public_id;
        const postItem = {
          urlFile,
          assetId,
          publicId,
        };
        await Post.create({
          images: [postItem],
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
        const assetId = result.asset_id;
        const publicId = result.public_id;
        const videoItem = {
          urlFile,
          assetId,
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

  async following(payload, auth) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, phone } = auth;
        const receiverId = payload?.receiverId;
        const senderUser = await User.findOne({
          $or: [{ email }, { phone }],
        });
        const receiveUser = User.findById({ _id: receiverId });
        const devicesToken = receiveUser?.devicesToken;
        const topic = `${senderUser?.name} đã follow bạn `;
        const response = await getMessaging().subscribeToTopic(
          devicesToken,
          topic
        );

        console.log("response", response);
        resolve({
          message: "Following success",
          status: true,
        });
      } catch (error) {
        reject({
          message: "Have error when following",
          status: false,
        });
      }
    });
  }
  async comment(payload, auth, id) {
    return new Promise(async (resolve, reject) => {
      const type = payload.type;
      let devicesToken = [];
      try {
        const { email, phone } = auth;
        const senderUser = await User.findOne({
          $or: [{ email }, { phone }],
        });
        if ((type = TYPE_POST.POST)) {
          const post = await Post.findById({ _id: id }).populate({
            path: "userId",
            select: "devicesToken",
          });
          devicesToken = [...post?.user?.devicesToken];
        } else {
          const video = await Video.findById({ _id: id }).populate({
            path: "userId",
            select: "devicesToken",
          });
          devicesToken = [...video?.user?.devicesToken];
        }
        const topic = `${senderUser?.name} đã comment 1 ${type}  của bạn `;
        const response = await getMessaging().subscribeToTopic(
          devicesToken,
          topic
        );
        console.log("response", response);
        resolve({
          message: "Comment success",
          status: true,
        });
      } catch (error) {
        reject({
          message: "Have error when comment",
          status: false,
        });
      }
    });
  }

  async like(payload, auth, id) {
    return new Promise(async (resolve, reject) => {
      const type = payload.type;
      let devicesToken = [];
      try {
        const { email, phone } = auth;
        const senderUser = await User.findOne({
          $or: [{ email }, { phone }],
        });
        if ((type = TYPE_POST.POST)) {
          const post = await Post.findById({ _id: id }).populate({
            path: "userId",
            select: "devicesToken",
          });
          devicesToken = [...post?.user?.devicesToken];
        } else {
          const video = await Video.findById({ _id: id }).populate({
            path: "userId",
            select: "devicesToken",
          });
          devicesToken = [...video?.user?.devicesToken];
        }

        const topic = `${senderUser?.name} đã comment 1 ${type}  của bạn `;
        const response = await getMessaging().subscribeToTopic(
          devicesToken,
          topic
        );
        console.log("response", response);
        resolve({
          message: "Following success",
          status: true,
        });
      } catch (error) {
        reject({
          message: "Have error when following",
          status: false,
        });
      }
    });
  }
}
module.exports = new UserService();
