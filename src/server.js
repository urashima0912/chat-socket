const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const morgan = require("morgan");
const path = require("path");

// BEGIN - socketIO

io.on("connection", (socket) => {
  console.log("socket: ", socket.id);

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("writing", (msg) => {
    socket.broadcast.emit("writing", msg);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

// END - socketIO

// Settings.
app.set("port", process.env.PORT || 3500);

// Middlewares.
app.use(morgan("dev"));

// Routes.
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "room.html"));
});

// Public.
app.use(express.static(path.join(__dirname, "public")));

module.exports = {
  app,
  server,
};
