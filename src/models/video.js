const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  like: [{}],
});
const videoItemSchema = new Schema({
  url_file: { type: String },
  description: { type: String, default: "" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  assetId: { type: String },
  publicId: { type: String },
});
const video = new Schema(
  {
    name: { type: String },
    url_file: { type: String },
    content: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    shares: [{ type: Schema.Types.ObjectId, ref: "User" }],
    videos: [videoItemSchema],
    original: [{ type: Schema.Types.ObjectId, ref: "Original" }],
    comments: [commentItemSchema],
    type: { type: String, default: "video" },
  },
  {
    collection: "videos",
    timestamps: true,
  }
);

const Video = mongoose.model("video", video);
module.exports = {
  Video,
};
