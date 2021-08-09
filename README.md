# pubsub-example

publish &amp; subscribe pattern in JavaScript, including server side and client side example.

## I. Server Side Code

### node js basic setup

Project setup:

```bash
npm init -y
npm install express
```

WebSocket dependency setup: [ws](https://github.com/websockets/ws)

```bash
npm install ws
```

In my `index.js` file:

```js
const server = require("http").createServer();
const PORT = 8080;
```

Set up websocket connection:
reference: [ws-server-code-example](https://github.com/websockets/ws#external-https-server)

```js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });
wss.on("connection", function connection(ws, request, client) {
  ws.on("message", function message(msg) {
    console.log(`Received message ${msg} from user ${client}`);
  });
  ws.send("something");
  ws.on("close", function close() {
    console.log("disconnected");
  });
});
```

### II. define payload format

#### 2.1 Payload example send from client to server

- `type`: a string of **"publish"** or **"subscribe"** or **"unsubscribe"**
- `channel`: a topic string
- `message`: the data to publish (for now consider string data as simple case)

```js
const data = {
  type: "PUBLISH",
  message: message,
  channel: channel
};
```

#### 2.2 Payload example send from server to client

- `message`: the data to publish (for now consider string data as simple case)

```js
const data = {
  message: message
};
```

### III. Build Client Side

**Reference:**
[send and receive data example on client](https://github.com/websockets/ws#usage-examples)

#### 3.1 Use websocket in react:

**Install:**

```js

```
