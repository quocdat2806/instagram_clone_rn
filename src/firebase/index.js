const admin = require("firebase-admin");

const serviceAccount = require("../../datn-de212-firebase-adminsdk-r520c-370406415a.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "datn-de212.appspot.com",
});
const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};