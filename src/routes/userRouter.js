const express = require('express')
const userRouter  = express.Router();
const userController = require('../controllers/userController');
const { upload } = require('../helper');

userRouter.post('/createPost',upload.any(),userController.createPost)
userRouter.post('/createVideo',userController.createVideo)





module.exports = userRouter


