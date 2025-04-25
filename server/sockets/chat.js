const onlineUsers = new Map();
const LOG_TTL_MS  = 60 * 60 * 1000;  //1 hour
const generalLog  = [];                      
const dmLogs      = new Map();

function pruneLogs() {
  const cutoff = Date.now() - LOG_TTL_MS;
  while (generalLog.length && generalLog[0].ts < cutoff) generalLog.shift();
  for (const [k, arr] of dmLogs) {
    while (arr.length && arr[0].ts < cutoff) arr.shift();
    if (!arr.length) dmLogs.delete(k);
  }
}
setInterval(pruneLogs, 5 * 60 * 1000); //every 5 min

function socketConnection(io) {
    io.on("connection", socket => {

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
            io.to("general").emit("chatMessage", payload);
        });

        
        socket.on("privateMessage", ({ toEmail, fromEmail, message,ts }) => {
            const target = onlineUsers.get(toEmail);
            if (!target) return;                 //user offline
            const full = { fromEmail, toEmail, message, ts };

            const key = [fromEmail, toEmail].sort().join("|");
            if (!dmLogs.has(key)) dmLogs.set(key, []);
            dmLogs.get(key).push(full);

            io.to(target.socketId).emit("privateMessage",full);
            socket.emit("privateMessage", full); 
        });
            
        
    
        socket.on("disconnect", () => {
            for (const [email, info] of onlineUsers) {
                if (info.socketId === socket.id) {
                  onlineUsers.delete(email);
                  break;
                }
              }
        
              
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
  