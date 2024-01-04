const express = require('express')
const authRouter  = express.Router();
const authController = require('../controllers/authController')
authRouter.post('/signup',authController.createUser)
authRouter.post('/signin',authController.loginUser)





module.exports = authRouter


