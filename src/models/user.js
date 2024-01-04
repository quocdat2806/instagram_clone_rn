const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema(
  {
    name: {type:String,require:true,minLength:1,maxLength:20,trim:true},
    phone:{
      type:Number,
      minLength:8,
      maxLength:30,
      trim:true,
      allowNull:true,
      index:true,
      sparse:true,
      unique:true,
      partialFilterExpression:true,
      require:false,

     
    },
    refreshToken:{
      type:String,
    },
    passWord:{
      type:String,
    },
    email:{
      type:String,
      minLength:6,
      maxLength:20,
      trim:true,
      allowNull:true,
      index:true,
      sparse:true,
      unique:true,
      require:false,
      partialFilterExpression:true



    },
    fullName:{
      type:String,
      minLength:5,
      maxLength:30,
      trim:true,
      require:true,

    


    },
    userName:{
      type:String,
      minLength:5,
      maxLength:30,
      trim:true,
      require:true,


    },
    avatar:{
      type:String

    }

  },
  {
    collection: "users",
    timestamps: true,
    
    
    
  }
);

const User =  mongoose.model('user', user);
module.exports={
User
}




