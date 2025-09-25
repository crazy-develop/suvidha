// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // development में allow all, production में secure करना
  }
});

// जब कोई user connect होता है
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // जब user message भेजता है
  socket.on("chatMessage", (msg) => {
    console.log("Message:", msg);

    // सब users को message भेजो
    io.emit("chatMessage", msg);
  });

  // disconnect होने पर
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
