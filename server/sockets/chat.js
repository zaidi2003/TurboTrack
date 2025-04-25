// server/sockets/chat.js
const onlineUsers = new Map();

function socketConnection(io) {
    io.on("connection", socket => {
        console.log("socket connected:", socket.id);

        socket.on("registerMe", ({ email, username }) => {
            if (!email) return;
            onlineUsers.set(email, { socketId: socket.id, username });
            io.emit("onlineList",
                Array.from(onlineUsers.entries()).map(([email, v]) => ({ email, ...v })));
        });

        socket.on("joinGeneral", () => {
            socket.join("general");
        });
    
        socket.on("chatMessage", payload => {
            console.log(`chatMessage from HJDWEDDYU ${socket.id}:`, payload);
            io.to("general").emit("chatMessage", payload);
        });

        
        socket.on("privateMessage", ({ toEmail, fromEmail, message }) => {
            const target = onlineUsers.get(toEmail);
            if (!target) return;                 // user offline – you could queue or send error
            io.to(target.socketId).emit("privateMessage",
                { fromEmail, message });
            socket.emit("privateMessage",
                { toEmail, message });
        });
            
        
    
        socket.on("disconnect", () => {
            console.log("socket disconnected:", socket.id);
            for (const [email, info] of onlineUsers) {
                if (info.socketId === socket.id) {
                  onlineUsers.delete(email);
                  break;
                }
              }
        
              // broadcast the updated list
              io.emit(
                "onlineList",
                Array.from(onlineUsers.entries()).map(([e, v]) => ({ email: e, ...v }))
              );
        });
    });

}
  module.exports = {
    socketConnection
  };
  