class PubSub {
  constructor() {
    this.channels = new Map(); // <channel, [client_ws]>
  }
  publish(ws, channel, message) {
    if (!this.channels.has(channel)) {
      return;
    }
    this.channels.get(channel).forEach((subscriber) => {
      subscriber.send(
        JSON.stringify({
          message
        })
      );
    });
  }
  subscribe(ws, channel) {
    if (!this.channels.has(channel)) {
      this.channels.set(channel, []);
    }
    this.channels.get(channel).push(ws);
  }
  unsubscribe(ws, channel) {
    if (!this.channels.has(channel)) {
      return;
    }
    var deleteIndex = this.channels.get(channel).indexOf(ws);
    this.channels.get(channel).splice(deleteIndex, 1);
  }
}

module.exports = PubSub;
