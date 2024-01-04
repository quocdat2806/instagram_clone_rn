const mongoose = require("mongoose");
const { Schema } = mongoose;





const commentItemSchema = new Schema(
    {
      userId: {type:Schema.Types.ObjectId,ref:"User"},
      content:{type:String},
      like:[{}]
    }
  );
  
const post = new Schema(
  {
    title:{type:String,minLength:1},
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    favorites:[{type:Schema.Types.ObjectId,ref:"User"}],
    shares:[{type:Schema.Types.ObjectId,ref:"User"}],
    postImages:[{type:String}],
    original:[{type:Schema.Types.ObjectId,ref:"Original"}]

  },
  {
    collection: "posts",
    timestamps: true,
    
    
    
  }
);

const Post =  mongoose.model('post', post);
module.exports={
    Post
}




