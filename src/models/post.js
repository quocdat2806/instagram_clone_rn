const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageItemSchema = new Schema(
  {
    urlFile: { type: String },
    description: { type: String, default: "" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    assetId: { type: String },
    publicId: { type: String },
  },
  {
    _id: false,
  }
);
const postSchema = new Schema(
  {
    content: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    shares: [{ type: Schema.Types.ObjectId, ref: "User" }],
    images: [imageItemSchema],
    original: [{ type: Schema.Types.ObjectId, ref: "Original" }],
    type: { type: String, default: "post" },
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);
module.exports = {
  Post,
};
