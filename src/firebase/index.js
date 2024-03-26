var admin = require("firebase-admin");

var serviceAccount = require("../firebase_config_projects/instagram-7c094-firebase-adminsdk-1elos-0b28bbe672.json");

const { getMessaging } = require("firebase-admin/messaging");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "instagram-7c094",
});

module.exports = { getMessaging };
