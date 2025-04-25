//chat jsx

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

/* ---------------- one-time socket ----------------- */
const ENDPOINT           = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
window.__tt_socket__     = window.__tt_socket__ || io(ENDPOINT, { autoConnect: false });
const socket             = window.__tt_socket__;

/* ---------------- React component ----------------- */
export default function Chat() {
  // hold the real username here
  const [username, setUsername] = useState('Anonymous');
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState('');
  const messagesEndRef          = useRef(null);

  // fetch the logged-in user’s name once on mount
useEffect(() => {
      const token = JSON.parse(localStorage.getItem('auth') || '""');
      if (!token) return;
      axios.get(`${ENDPOINT}/api/v1/dashboard/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (res.data.username) setUsername(res.data.username);
      })
      .catch(err => console.error('could not fetch username', err));
    }, []);

  /* connect + listeners (only once) */
  useEffect(() => {
    if (!socket.connected) socket.connect();

    const onConnect = () => socket.emit('joinGeneral');
    const onChat    = (msg) => setMessages((m) => [...m, msg]);

    socket.on('connect',     onConnect);
    socket.on('chatMessage', onChat);

    return () => {
      socket.off('connect',     onConnect);
      socket.off('chatMessage', onChat);
    };
  }, []);

  /* auto-scroll on every new message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* ----------  ⬇︎ this function was missing  ---------- */
  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const payload = { user: localStorage.getItem('username') || 'Anonymous', message: text };
    socket.emit('chatMessage', payload);
    setInput('');
  };
  /* --------------------------------------------------- */

  return (
    <div style={{ padding:20, maxWidth:600, margin:'0 auto', color:'#EEE' }}>
      <h2 style={{ color:'#FFF' }}>General Chat</h2>
      <div style={{ height:400, overflowY:'auto', background:'#222', padding:10, borderRadius:8 }}>
        {messages.map((m,i)=>
          <div key={i} style={{ margin:'5px 0' }}>
            <strong>{m.user}:</strong> {m.message}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} style={{ display:'flex', marginTop:10 }}>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          placeholder="Type a message…"
          style={{ flex:1, padding:8, borderRadius:4, border:'1px solid #444', background:'#333', color:'#fff' }}
        />
        <button type="submit" style={{ marginLeft:8, padding:'8px 16px', background:'#1B1B1B', color:'#FFF', border:'none', borderRadius:4, cursor:'pointer' }}>
          Send
        </button>
      </form>
    </div>
  );
}
