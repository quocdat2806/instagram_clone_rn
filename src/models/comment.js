const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  parentPath: [{ type: Schema.Types.ObjectId, ref: 'Comment',default:null }],
  likes: { type: Number, default: 0 },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});
const Comment = mongoose.model('Comment', commentSchema);
