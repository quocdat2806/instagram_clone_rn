const mongoose = require("mongoose");
async function connectToDb() {
  try {
    await mongoose.connect(`${process.env.URL_DB}`);
    console.log("connect successfully");
  } catch (e) {
    console.log(e);
  }
}

module.exports = { connectToDb };
