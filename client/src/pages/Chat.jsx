import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useUser } from "../context/UserContext";

//one-time socket shared across HMR reloads
const ENDPOINT       = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
window.__tt_socket__ = window.__tt_socket__ || io(ENDPOINT, { autoConnect: false });
const socket         = window.__tt_socket__;

export default function Chat() {
  const { userData } = useUser();
  const username     = userData.username || "Guest";
  const email      = userData.email    || "guest@email";

  const [messages, setMessages] = useState([]);
  const [privateMsgs,setPrivate]  = useState({}); // {email:[]}
  const [online,     setOnline]   = useState([]); // [{email, username, socketId}]
  const [activeDM,   setActiveDM] = useState(null); // peer email
  const [input,    setInput]    = useState("");
  const messagesEndRef          = useRef(null);

  //connect + register listeners (run once)
  useEffect(() => {
    if (!socket.connected) socket.connect();

    const onConnect = () => {
        socket.emit("joinGeneral");
        socket.emit("registerMe", { email, username });
    }

    const onChat    = (msg) => setMessages((m) => [...m, msg]);
    const onList = (list) => setOnline(list.filter(u => u.email !== email));

    const onPM = ({ fromEmail, toEmail, message }) => {
        const peer = fromEmail === email ? toEmail : fromEmail;
        setPrivate(prev => ({
          ...prev,
          [peer]: [...(prev[peer]||[]), { fromEmail, toEmail, message }]
        }));
      };

    socket.on("connect",     onConnect);
    socket.on("chatMessage", onChat);
    socket.on('onlineList',  onList);
    socket.on('privateMessage', onPM);

    return () => {
      socket.off("connect",     onConnect);
      socket.off("chatMessage", onChat);
      socket.off('onlineList',  onList);
      socket.off('privateMessage', onPM);
    };
  }, [email, username]);

  //auto-scroll on every new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    if (!activeDM) {
        // public
        socket.emit('chatMessage', { user: username, message: text });
    } else {
        // private
        socket.emit('privateMessage', { fromEmail: email, toEmail: activeDM, message:text });
    }
    setInput("");
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 800,
        margin: "0 auto",
        color: "#EEE",
        display: "flex",
        gap: 20,
      }}
    >
      {/* ──────────── LEFT • online list ──────────── */}
      <div style={{ width: 180 }}>
        <h3 style={{ marginTop: 0 }}>Online</h3>
  
        {online.map((u) => (
          <div
            key={u.email}
            onClick={() => setActiveDM(u.email)}
            style={{
              cursor: "pointer",
              padding: 4,
              borderRadius: 4,
              background: activeDM === u.email ? "#555" : "transparent",
            }}
          >
            {u.username}
          </div>
        ))}
      </div>
  
      {/* ──────────── RIGHT • chat window ──────────── */}
      <div style={{ flex: 1 }}>
        <h2 style={{ color: "#FFF" }}>
          {activeDM
            ? `Direct chat with ${
                online.find((o) => o.email === activeDM)?.username || activeDM
              }`
            : "General Chat"}
        </h2>
  
        <div
          style={{
            height: 400,
            overflowY: "auto",
            background: "#222",
            padding: 10,
            borderRadius: 8,
          }}
        >
          {/* -------- message area -------- */}
          {activeDM
            ? (privateMsgs[activeDM] || []).map((m, i) => (
                <div key={i} style={{ margin: "5px 0" }}>
                  <strong>
                    {m.fromEmail === email ? "You" : online.find((o) => o.email === activeDM)?.username}
                    :
                  </strong>{" "}
                  {m.message}
                </div>
              ))
            : messages.map((m, i) => (
                <div key={i} style={{ margin: "5px 0" }}>
                  <strong>{m.user}:</strong> {m.message}
                </div>
              ))}
  
          <div ref={messagesEndRef} />
        </div>
  
        {/* -------- composer -------- */}
        <form onSubmit={handleSend} style={{ display: "flex", marginTop: 10 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 4,
              border: "1px solid #444",
              background: "#333",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: 8,
              padding: "8px 16px",
              background: "#1B1B1B",
              color: "#FFF",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
  
        {/* back-to-general link */}
        {activeDM && (
          <button
            onClick={() => setActiveDM(null)}
            style={{
              marginTop: 6,
              background: "none",
              border: "none",
              color: "#888",
              cursor: "pointer",
            }}
          >
            ← back to general
          </button>
        )}
      </div>
    </div>
  );
}  