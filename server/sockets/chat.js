// server/sockets/chat.js

function socketConnection(io) {
    io.on("connection", socket => {
      console.log("socket connected:", socket.id);
  
      socket.on("joinGeneral", () => {
        socket.join("general");
      });
  
    //   socket.on("chatMessage", ({ user, message }) => {
    //     // naive censor
    //     const bad = ["foo","bar"];
    //     const filtered = message
    //       .split(" ")
    //       .map(w => bad.includes(w.toLowerCase()) ? "*".repeat(w.length) : w)
    //       .join(" ");
  
    //     io.to("general").emit("chatMessage", { user, message: filtered });
    //   });
      socket.on("chatMessage", payload => {
        console.log(`↪ chatMessage from HJDWEDDYU ${socket.id}:`, payload);
        io.to("general").emit("chatMessage", payload);
        });
  
      socket.on("disconnect", () => {
        console.log("socket disconnected:", socket.id);
      });
    });
  };
  module.exports = {
    socketConnection
  };
  