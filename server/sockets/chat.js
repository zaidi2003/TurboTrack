// server/sockets/chat.js
const onlineUsers = new Map();
const LOG_TTL_MS  = 60 * 60 * 1000;          // 1 hour
const generalLog  = [];                      // [{ user,message,ts }]
const dmLogs      = new Map();               // key = pairId  e.g.  "A|B"

function pruneLogs() {
  const cutoff = Date.now() - LOG_TTL_MS;
  while (generalLog.length && generalLog[0].ts < cutoff) generalLog.shift();
  for (const [k, arr] of dmLogs) {
    while (arr.length && arr[0].ts < cutoff) arr.shift();
    if (!arr.length) dmLogs.delete(k);
  }
}
setInterval(pruneLogs, 5 * 60 * 1000); // every 5 min

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
            socket.emit("chatHistory", generalLog);
        });
    
        socket.on("chatMessage", payload => {
            generalLog.push(payload);
            console.log(`chatMessage from HJDWEDDYU ${socket.id}:`, payload);
            io.to("general").emit("chatMessage", payload);
        });

        
        socket.on("privateMessage", ({ toEmail, fromEmail, message,ts }) => {
            const target = onlineUsers.get(toEmail);
            if (!target) return;                 // user offline – you could queue or send error
            const full = { fromEmail, toEmail, message, ts };

            /* store in dm log */
            const key = [fromEmail, toEmail].sort().join("|");
            if (!dmLogs.has(key)) dmLogs.set(key, []);
            dmLogs.get(key).push(full);

            io.to(target.socketId).emit("privateMessage",full);
            socket.emit("privateMessage", full);    // echo back to sender
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
  