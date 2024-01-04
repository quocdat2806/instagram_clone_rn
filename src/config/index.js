var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var express = require("express");
const { connectToDb } = require("../db");
const router = require("../routes");
let https;
async function setUpServer (app){
    try {
        https = require('node:https');
        await connectToDb()
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cookieParser());
        router(app)
      } catch (err) {
        console.error('https support is disabled!');
      } 
 
}

module.exports={
    setUpServer
}




