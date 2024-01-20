const mongoose = require("mongoose");
const { Schema } = mongoose;
const notificationSchema = new Schema(
  {
    content: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, default: "notification" },
  },
  {
    collection: "notifications",
    timestamps: true,
  }
);

const Notification = mongoose.model("notification", notificationSchema);
module.exports = {
  Notification,
};
