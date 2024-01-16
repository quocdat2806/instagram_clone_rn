const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String },
  commentLeft: { type: Number },
  commentRight: { type: Number },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

commentSchema.statics.addComment = async function (content, parentId, postId) {
  let commentLeft, commentRight;
  if (parentId) {
    const parentComment = await this.findById(parentId);
    if (!parentComment) {
      throw new Error("Parent comment not found");
    }
    commentLeft = parentComment.commentRight;
    commentRight = commentLeft + 1;

    await this.updateMany(
      { commentLeft: { $gte: commentLeft } },
      { $inc: { commentLeft: 2, commentRight: 2 } }
    );
  } else {
    commentLeft = 1;
    commentRight = 2;
  }

  const comment = new this({
    content: content,
    commentLeft: commentLeft,
    commentRight: commentRight,
    postId: postId,
  });

  await comment.save();
  return comment;
};

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
