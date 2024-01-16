const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoItemSchema = new Schema(
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
const video = new Schema(
  {
    name: { type: String },
    content: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    shares: [{ type: Schema.Types.ObjectId, ref: "User" }],
    videos: [videoItemSchema],
    original: [{ type: Schema.Types.ObjectId, ref: "Original" }],
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
