const {
  uploadFilesToCloudinary,
  uploadVideoToCloudinary,
} = require("../helper");
const { Video } = require("../models/video");
const { Follow } = require("../models/follower.js");

const { User } = require("../models/user");
const { Post } = require("../models/post");
const { Comment } = require("../models/comment.js");
const { Like } = require("../models/like.js");
const { getMessaging } = require("../firebase/index.js");
const { TYPE_COMMON } = require("../constants/index.js");
const { findUserInfo, getResultProgressUpload } = require("../utils/index.js");
class UserService {
  async createPost(payload, auth) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await findUserInfo(auth);
        let postItem = [];
        if (payload.file) {
          const result = await uploadFilesToCloudinary(payload.file);
          postItem = getResultProgressUpload(result);
        }
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
        const user = await findUserInfo(auth);
        let videoItem = [];
        if (payload?.path) {
          const result = await uploadVideoToCloudinary(payload.path);
          videoItem = getResultProgressUpload(result);
        }
        await Video.create({
          videos: [videoItem],
          userId: user._id,
          content: payload.content,
        });
        resolve({ message: "Create video  success", status: true });
      } catch (error) {
        console.log(error);
        reject({
          message: "Have error when create video",
          status: false,
        });
      }
    });
  }

  async addFollow(receiverId, auth) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await findUserInfo(auth);

        // const devicesToken = receiveUser?.devicesToken;
        // const topic = `${senderUser?.name} đã follow bạn `;
        // const response = await getMessaging().subscribeToTopic(
        //   devicesToken,
        //   topic
        // );
        const followRes = await Follow.create({
          followerId: user._id,
          followingId: receiverId,
        });
        await User.findByIdAndUpdate(
          { _id: receiverId },
          {
            $push: { follows: followRes._id },
          }
        );
        await User.findByIdAndUpdate(
          { _id: user._id },
          {
            $push: { follows: followRes._id },
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
  async addComment(payload, auth, id) {
    return new Promise(async (resolve, reject) => {
      const content = payload.content;
      const parentId = payload?.parentId;

      let devicesToken = [];
      try {
        const user = await findUserInfo(auth);

        const type = payload.type;
        const comment = await Comment.addComment(
          content,
          parentId,
          id,
          user._id
        );
        if (type == TYPE_COMMON.POST) {
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

  async addLike(id, auth, type) {
    return new Promise(async (resolve, reject) => {
      const like = await Like.addLike(id, type);
      let devicesToken = [];
      try {
        const user = await findUserInfo(auth);

        if ((type = TYPE_COMMON.POST)) {
          // const post = await Post.findById({ _id: id }).populate({
          //   path: "userId",
          //   select: "devicesToken",
          // });
          // devicesToken = [...post?.user?.devicesToken];
        } else if (type === TYPE_COMMON.VIDEO) {
          // const video = await Video.findById({ _id: id }).populate({
          //   path: "userId",
          //   select: "devicesToken",
          // });
          // devicesToken = [...video?.user?.devicesToken];
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
  async getListPostFollowerUsers(auth, limit, page) {
    return new Promise(async (resolve, reject) => {
      try {
        const pageSize = parseInt(limit);
        const pageNumber = parseInt(page);
        const skip = (pageNumber - 1) * pageSize;
        const user = await findUserInfo(auth);
        const followingUsers = await Follow.find({
          followerId: user._id,
        }).select("followingId");
        const followingUserIds = followingUsers.map((user) => user.followingId);

        const [totalPosts, totalVideos] = await Promise.all([
          Post.countDocuments({ userId: { $in: followingUserIds } }),
          Video.countDocuments({ userId: { $in: followingUserIds } }),
        ]);
        let limitPost = Math.min(totalPosts, Math.floor(limit / 2));
        let limitVideo = Math.min(totalVideos, limit - limitPost);

        if (totalVideos < totalPosts) {
          limitPost = Math.min(totalPosts, limit - totalVideos);
          limitVideo = totalVideos;
        } else if (totalVideos === totalPosts) {
          limitPost = totalPosts;
          limitVideo = totalVideos;
        } else {
          limitPost = totalPosts;
          limitVideo = Math.min(totalVideos, limit - totalPosts);
        }

        const postsAndVideos = await Promise.all([
          Post.find({ userId: { $in: followingUserIds } })
            .populate({
              path: "userId",
              select: "name avatar createdAt updatedAt",
            })
            .skip(skip)
            .limit(limitPost),
          Video.find({ userId: { $in: followingUserIds } })
            .populate({
              path: "userId",
              select: "name avatar createdAt updatedAt",
            })
            .skip(skip)
            .limit(limitVideo),
        ]);
        const data = {
          posts: postsAndVideos[0],
          videos: postsAndVideos[1],
        };

        resolve({
          message: "Get list post follower of user success",
          status: true,
          data,
        });
      } catch (error) {
        console.log("error", error);
        reject({
          message: "Get list post follower of user failed",
          status: false,
        });
      }
    });
    s;
  }
  async getInfoUser(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const postLength = await Post.find({ userId: userId });
        const videoLength = await Video.find({ userId: userId });
        const lengthTotalPost = postLength + videoLength;
        const user = await User.find({ _id: userId }).populate({
          path: "follows",
          select: "followerId followingId",
        });
        resolve({
          message: "Get info user success",
          status: true,
          lengthTotalPost,
          user,
        });
      } catch (error) {
        console.log("error", error);
        reject({
          message: "Have error when get info user",
          status: false,
        });
      }
    });
  }
}
module.exports = new UserService();
