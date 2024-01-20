const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: { type: String },
    parentIdComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    type: { type: String, default: "comment" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

commentSchema.statics.addComment = async function (
  content,
  parentId,
  postId,
  userId
) {
  const comment = new this({
    content,
    postId,
    parentIdComment: parentId,
    userId,
  });

  await comment.save();
  return comment;
};

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
