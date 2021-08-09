# pubsub-example

publish &amp; subscribe pattern in Node.js, including server side and client side example.

> Special Note: react do NOT support "ws" npm package, please try "Socket.io-client" if you want to use react on client side.

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

### III. Serving Static HTML files in Express

**Reference:**
https://expressjs.com/en/starter/static-files.html

> Note: here please put all static files inside "public" folder under root directory.

Code Example:

```js
const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));
```

Then the valid URL examples are:

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

### IV. Writing WebSocket client applications

**Reference:**
[Writing WebSocket client applications - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)

#### 4.1 Creating a WebSocket object

In order to communicate using the WebSocket protocol, you need to create a WebSocket object; this will automatically attempt to open the

```
webSocket = new WebSocket(url);
```

#### 4.2 Safefly send data to server from client

As establishing a connection is asynchronous and prone to _failure_ there is
**NO guarantee** that calling the `send()` method immediately after creating a WebSocket object will be successful.

We can at least be sure that attempting to send data only takes place **once a connection is established** by defining an `onopen` event handler to do the work:

```js
ws.onopen = function (event) {
  ws.send("some data");
};
```

#### 4.3 Receiving messages from the server

```
ws.onmessage = function (event) {
  console.log(event.data);
}
```

### V. How to Run this Project ?

- Step1: start the server
  ```bash
  node index.js
  ```
- Step2: open the two urls
  ```text
  http://localhost:8080/publish.html
  http://localhost:8080/subscribe.html
  ```
- Step3: free to interact on UI, eg: input some text, click button to test

**Demo:**

<img src="./pubsub-demo.gif" />
