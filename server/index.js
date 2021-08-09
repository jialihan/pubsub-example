// nodejs server setup
const server = require("http").createServer();
const PORT = 8080;

// express serve static files
const express = require("express");
const app = require("express")();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// pubsub
const PubSub = require("./pubsub");
const pubsub = new PubSub();

// websocket setup
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });
wss.on("connection", function connection(ws, request) {
  ws.on("message", function message(data) {
    console.log(`Received message ${data}`);
    const { type, channel, message } = JSON.parse(data);
    switch (type) {
      case "PUBLISH":
        pubsub.publish(ws, channel, message);
        break;
      case "SUBSCRIBE":
        pubsub.subscribe(ws, channel);
        break;
      case "UNSUBSCRIBE":
        pubsub.unsubscribe(ws, channel);
        break;
    }
  });
  //  ws.send("something");
  ws.on("close", function close() {
    console.log("client disconnected");
  });
});

// start server
server.on("request", app);
server.listen(PORT, () => {
  console.log(`listening on  http://localhost:${PORT}`);
});
