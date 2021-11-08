const WebSocket = require("ws");
const { uuid } = require("uuidv4");

const onLoadMessage = {
  room: "testing123",
  data: {
    any: "data",
    could: "be",
    here: true,
  },
};

const wss = new WebSocket.Server({ port: 7071 });

const clients = new Map();

const startSend = () => {
  [...clients.keys()].forEach((client) => {
    client.send(JSON.stringify(onLoadMessage));
  });
};

wss.on("connection", (ws) => {
  const id = uuid();
  const metadata = { id };
  clients.set(ws, metadata);
  setTimeout(() => startSend(), 3000);
});

wss.on("close", () => {
  clients.delete(ws);
});
