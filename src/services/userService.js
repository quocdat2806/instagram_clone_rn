const {
  uploadFilesToCloudinary,
  uploadVideoToCloudinary,
} = require("../helper");
const { Video } = require("../models/video");
const { User } = require("../models/user");
const { Post } = require("../models/post");
const { getMessaging } = require("../firebase/index.js");
const { TYPE_POST } = require("../constants/index.js");
const { Comment } = require("../models/comment.js");
const { Like } = require("../models/like.js");
const { Follow } = require("../models/follower.js");
const { FindUserInfo } = require("../utils/index.js");
class UserService {
  async createPost(payload, auth) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await FindUserInfo(auth);
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

  async following(receiverId, auth) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, phone } = auth;
        const senderUser = await User.findOne({
          $or: [{ email }, { phone }],
        });
        // const devicesToken = receiveUser?.devicesToken;
        // const topic = `${senderUser?.name} đã follow bạn `;
        // const response = await getMessaging().subscribeToTopic(
        //   devicesToken,
        //   topic
        // );
        const FollowRes = await Follow.create({
          followerId: senderUser._id,
          followingId: receiverId,
        });
        await User.findByIdAndUpdate(
          { _id: receiverId },
          {
            $push: { follows: FollowRes._id },
          }
        );
        await User.findByIdAndUpdate(
          { _id: senderUser._id },
          {
            $push: { follows: FollowRes._id },
          }
        );

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
      const content = payload.content;
      const parentId = payload?.parentId;

      let devicesToken = [];
      try {
        const { email, phone } = auth;
        const senderUser = await User.findOne({
          $or: [{ email }, { phone }],
        });

        const type = payload.type;
        const comment = await Comment.addComment(
          content,
          parentId,
          id,
          senderUser._id
        );
        if (type == TYPE_POST.POST) {
          // const post = await Post.findById({ _id: id }).populate({
          //   path: "userId",
          //   select: "devicesToken",
          // });
          // devicesToken = [];
        } else {
          // const video = await Video.findById({ _id: id }).populate({
          //   path: "userId",
          //   select: "devicesToken",
          // });
          // devicesToken = [];
        }
        // const topic = `${senderUser?.name} đã comment 1 ${type}  của bạn `;
        // const response = await getMessaging().subscribeToTopic(
        //   devicesToken,
        //   topic
        // );
        // console.log("response", response);
        resolve({
          message: "Comment success",
          status: true,
          comment,
        });
      } catch (error) {
        console.log("error", error);
        reject({
          message: "Have error when comment",
          status: false,
        });
      }
    });
  }

  async like(id, auth, type) {
    return new Promise(async (resolve, reject) => {
      const like = await Like.like(id, type);
      let devicesToken = [];
      try {
        const { email, phone } = auth;
        const senderUser = await User.findOne({
          $or: [{ email }, { phone }],
        });
        if ((type = TYPE_POST.POST)) {
          // const post = await Post.findById({ _id: id }).populate({
          //   path: "userId",
          //   select: "devicesToken",
          // });
          // devicesToken = [...post?.user?.devicesToken];
        } else if (type === TYPE_POST.VIDEO) {
          // const video = await Video.findById({ _id: id }).populate({
          //   path: "userId",
          //   select: "devicesToken",
          // });

          devicesToken = [...video?.user?.devicesToken];
        } else {
          //  const video = await Comment.findById({ _id: id }).populate({
          //    path: "userId",
          //    select: "devicesToken",
          //  });
          //  devicesToken = [...video?.user?.devicesToken];
        }

        // const topic = `${senderUser?.name} đã like 1 ${type}  của bạn `;
        // const response = await getMessaging().subscribeToTopic(
        //   devicesToken,
        //   topic
        // );
        resolve({
          message: "Like success",
          status: true,
          like,
        });
      } catch (error) {
        console.log("error", error);
        reject({
          message: "Have error when like",
          status: false,
        });
      }
    });
  }
  async getComment(postId, limit, page) {
    return new Promise(async (resolve, reject) => {
      try {
        const pageSize = parseInt(limit);
        const pageNumber = parseInt(page);
        console.log(pageNumber, pageSize);
        const skip = (pageNumber - 1) * pageSize;
        const comments = await Comment.find({ postId })
          .skip(skip)
          .limit(pageSize);

        resolve({
          message: "Get list comment success",
          status: true,
          comments,
        });
      } catch (error) {
        reject({
          message: "Have error when get list comment",
          status: false,
        });
      }
    });
  }
}
module.exports = new UserService();
