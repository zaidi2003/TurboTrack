import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useUser } from "../context/UserContext";
import dayjs from "dayjs";   // tiny date-formatter (npm i dayjs)

import { UserProfile, SideNavBar } from "../components";

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
  const messagesEndRef     = useRef(null);
  const chatBoxRef     = useRef(null);

  //connect + register listeners (run once)
  useEffect(() => {
    if (!socket.connected) socket.connect();

    const register = () =>
        socket.emit("registerMe", { email, username });

    const onConnect = () => {
      socket.emit("joinGeneral");
      register();
    };

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
  }, []);

  useEffect(() => {
        if (!socket.connected) return;
        socket.emit("registerMe", { email, username });
      }, [email, username]);

  //auto-scroll on every new message
  useEffect(() => {
    const box = chatBoxRef.current;
    if (!box) return;

    const { scrollHeight, clientHeight, scrollTop } = box;
    const isNearBottom   = scrollHeight - (scrollTop + clientHeight) < 60;

    // if user is already near the bottom OR pane just overflowed – scroll down
    if (isNearBottom || scrollHeight > clientHeight + 20) {
      box.scrollTop = scrollHeight;
    }
  }, [messages, privateMsgs, activeDM]);

  
  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const ts = Date.now();
    
    if (!activeDM) {
      socket.emit("chatMessage", { user: username, message: text, ts });
    } else {
      /* optimistic update so *you* can see the DM immediately */
      setPrivate((prev) => ({
        ...prev,
        [activeDM]: [
          ...(prev[activeDM] || []),
          { fromEmail: email, toEmail: activeDM, message: text, ts },
        ],
      }));

      socket.emit("privateMessage", {
        fromEmail: email,
        toEmail: activeDM,
        message: text,
        ts,
      });
    }
    setInput("");
  };

  /* ─────────────────────────  Chat.jsx  ────────────────────────── */

return (
    <div
      style={{
        width: "100%",
        height: 982,
        position: "relative",
        background:
          "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
        overflow: "hidden",
        fontFamily: "Readex Pro",
      }}
    >
      {/* permanent nav + avatar */}
      <SideNavBar />
      <UserProfile style={{ position: "absolute", top: 30, right: 40 }} />
  
      {/*  MAIN CHAT AREA  */}
      <main
        style={{
          position: "absolute",
          left: 315,          // 285-px bar + 30-px breathing room
          right: 30,
          top: 120,
          bottom: 1,
          display: "flex",
          gap: 20,
          color: "#EEE",
        }}
      >
        {/* ──────────── LEFT • online list ──────────── */}
        <aside style={{ width: 180 }}>
          <h3 style={{  marginTop: -100 }}>Online</h3>
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
        </aside>
  
        {/* ──────────── RIGHT • chat window ──────────── */}
        <section 
        style={{ 
            flex: 1, 
            maxWidth: 600,
            height: 600,
            display: "flex", 
            flexDirection: "column"
            }}
        >
          <h2 style={{ color: "#FFF", margin: 0, marginBottom: 10 }}>
            {activeDM
              ? `Direct chat with ${
                  online.find((o) => o.email === activeDM)?.username || activeDM
                }`
              : "General Chat"}
          </h2>
  
          {/*  message pane  */}
          <div
            ref={chatBoxRef} 
            style={{
              flex: 1,
              overflowY: "auto",
              background: "#222",
              padding: 10,
              borderRadius: 8,
            }}
          >
            {activeDM
              ? (privateMsgs[activeDM] || []).map((m, i) => (
                  <div key={i} style={{ margin: "5px 0" }}>
                    <strong>
                      {m.fromEmail === email
                        ? "You"
                        : online.find((o) => o.email === activeDM)?.username}
                      :
                    </strong>{" "}
                    {m.message}{" "}
                    <span style={{ fontSize: 11, color: "#888" }}>
                      {dayjs(m.ts).format("HH:mm")}
                    </span>

                  </div>
                ))
              : messages.map((m, i) => (
                  <div key={i} style={{ margin: "5px 0" }}>
                    <strong>{m.user}:{" "}</strong> 
                    {m.message}{" "}
                    <span style={{ fontSize: 11, color: "#888" }}>
                      {dayjs(m.ts).format("HH:mm")}
                    </span>
                  </div>
                ))}
            <div ref={messagesEndRef} />
          </div>
  
          {/*  composer  */}
          <form
            onSubmit={handleSend}
            style={{ display: "flex", marginTop: 10, gap: 8 }}
          >
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
                padding: "8px 20px",
                background: "#510202",
                color: "#FFF",
                border: "none",
                font: "Zen Dots",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </form>
  
          {/*  back-to-general link  */}
          {activeDM && (
            <button
              onClick={() => setActiveDM(null)}
              style={{
                marginTop: 6,
                alignSelf: "flex-start",
                background: "none",
                border: "none",
                color: "#888",
                cursor: "pointer",
              }}
            >
              ← back to general
            </button>
          )}
        </section>
      </main>
    </div>
  );
  
}