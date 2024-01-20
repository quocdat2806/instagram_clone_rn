const mongoose = require("mongoose");
const { TYPE_POST } = require("../constants");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    postId: { type: Schema.Types.ObjectId, ref: "Post", default: null },
    videoId: { type: Schema.Types.ObjectId, ref: "Video", default: null },
    type: { type: String, default: "like" },
  },
  {
    collection: "likes",
    timestamps: true,
  }
);

likeSchema.statics.like = async function (id, type) {
  const likeObj = { type: type };
  switch (type) {
    case TYPE_POST.COMMENT: {
      likeObj.commentId = id;
      break;
    }
    case TYPE_POST.VIDEO: {
      likeObj.videoId = id;
      break;
    }
    case TYPE_POST.POST: {
      likeObj.postId = id;
      break;
    }
    default: {
      likeObj.commentId = id;
    }
  }

  const like = new this(likeObj);

  await like.save();
  return like;
};

const Like = mongoose.model("Like", likeSchema);
module.exports = { Like };
