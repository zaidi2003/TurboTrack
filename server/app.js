require("dotenv").config();
require('express-async-errors');
//establishes connection
const http = require("http");
const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const { Server } = require("socket.io");

const app = express();
const mainRouter = require("./routes/index");
const { socketConnection } = require ("./sockets/chat");

app.use(express.json());

app.use(cors())
app.use("/api/v1", mainRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: /http:\/\/localhost:\d+$/, //React origin
    methods: ["GET", "POST"]
  }
});
socketConnection(io);
const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () => {
      console.log(`Server + WS listening on port ${PORT}`);
    });
  } catch (err) {
    //console.error(err);
  }
};
start();