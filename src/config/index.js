var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var express = require("express");
const { connectToDb } = require("../db");
const router = require("../routes");

async function setUpServer (app){
    await connectToDb()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    router(app)
}

module.exports={
    setUpServer
}




