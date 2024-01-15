var express = require("express");
const { setUpServer } = require("./src/config");
var app = express();
setUpServer(app);
module.exports = app;
