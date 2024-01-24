const mongoose = require("mongoose");
const followerSchema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "follows",
  }
);

const Follow = mongoose.model("Follow", followerSchema);
module.exports = {
  Follow,
};
