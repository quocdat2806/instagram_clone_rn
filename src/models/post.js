const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  like: [{}],
});
const imageItemSchema = new Schema({
  url_file: { type: String },
  description: { type: String, default: "" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  assetId: { type: String },
  publicId: { type: String },
});
const post = new Schema(
  {
    content: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    shares: [{ type: Schema.Types.ObjectId, ref: "User" }],
    images: [imageItemSchema],
    original: [{ type: Schema.Types.ObjectId, ref: "Original" }],
    comments: [commentItemSchema],
    type: { type: String, default: "file" },
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

const Post = mongoose.model("post", post);
module.exports = {
  Post,
};
