const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
async function connectToDb() {
  try {
    await mongoose.connect(`${process.env.URL_DB}`, {});
    console.log("connect successfully");
  } catch (e) {
    console.log(e);
  }
}

module.exports = { connectToDb };
