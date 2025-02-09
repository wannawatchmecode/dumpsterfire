import { randomUUIDv7 } from "bun";

const express = require("express");
const bodyParser = require("body-parser");
const app = express({});
const netstat = require("node-netstat");
const io = require("socket.io-client");
const bun = require("bun");

const OCEAN_HOST = "http://localhost:7476/dumpsterfire/admin";

const OCEAN_AUTH_TOKEN = "1234-4321-9876-678";

const socket = io(OCEAN_HOST, {
  auth: {
    token: OCEAN_AUTH_TOKEN,
  },
});

let socketio;

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socketio = socket.io;
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
  socketio = undefined;
});

const parser = netstat.parserFactories.linux({});

const PORT = parseInt(process.env.PORT ?? "3000");

app.use(bodyParser.json());
app.post("/health/report", async (req, res) => {
  console.log(req.body);
  console.log(`Length: ${JSON.stringify(req.body).length}`);
  socket.emit("healthEvent", { id: bun.randomUUIDv7(), ...req.body });
  res.status = 200;
  res.json({
    Message: "received",
  });
});

console.log("Hello via Bun!");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
