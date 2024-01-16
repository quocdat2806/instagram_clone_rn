var express = require("express");
const { setUpServer } = require("./src/setup");
var app = express();
setUpServer(app);

module.exports = app;
