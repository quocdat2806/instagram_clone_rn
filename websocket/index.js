const WebSocket = require("ws");
const { following } = require("../src/services/userService.js");
function configWebSocket(server) {
  const wss = new WebSocket.Server({ server: server });
  wss.on("connection", function connection(ws) {
    console.log("connection");
  });
  wss.on("disconnect", function connection(ws) {
    console.log("disconnection");
  });
}
module.exports = { configWebSocket };
