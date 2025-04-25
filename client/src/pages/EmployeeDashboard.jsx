import { useState } from "react";
import { SideNavBar, UserProfile } from "../components";


const TrackStat = ({ track, count }) => (
  <div style={{ background:"#1f1f1f", padding:16, borderRadius:12 }}>
    <h3 style={{ color:"#aaa", fontSize:14, margin:0, marginBottom:4 }}>{track}</h3>
    <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
      <span style={{ fontSize:28, fontWeight:700, color:"#fff" }}>{count}</span>
      <span style={{ fontSize:13, color:"#aaa" }}>bookings</span>
    </div>
  </div>
);

const BookingRow = ({ name, track, date, time, status }) => {
  const badge = {
    Confirmed: { bg:"#064e3b", fg:"#6ee7b7" },
    Pending   : { bg:"#78350f", fg:"#fcd34d" },
    Cancelled : { bg:"#7f1d1d", fg:"#fca5a5" }
  }[status] || { bg:"#334155", fg:"#cbd5e1" };

  return (
    <tr style={{ borderTop:"1px solid #2e2e2e" }}>
      <td style={{ padding:"12px 0" }}>{name}</td>
      <td>{track}</td>
      <td>{date}</td>
      <td>{time}</td>
      <td>
        <span style={{
          padding:"2px 6px",
          borderRadius:4,
          fontSize:12,
          background:badge.bg,
          color:badge.fg
        }}>
          {status}
        </span>
      </td>
    </tr>
  );
};

const DashboardView = () => (
  <div>
    {/* header bar */}
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
      <h1 style={{ fontSize:28, fontWeight:700, color:"#e5e5e5", margin:0 }}>Employee Dashboard</h1>
      {/* tiny avatar shown only here (main avatar already in UserProfile) */}
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ width:32, height:32, borderRadius:"50%", background:"#555", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}>👤</div>
        <span style={{ color:"#fff" }}>Admin</span>
      </div>
    </div>

    {/* track summary */}
    <div style={{ background:"#151515", padding:24, borderRadius:16, marginBottom:28 }}>
      <h2 style={{ fontSize:18, color:"#e4e4e4", marginTop:0 }}>Track Summary</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:16, marginTop:12 }}>
        <TrackStat track="2F2F"        count={24} />
        <TrackStat track="Monza"       count={18} />
        <TrackStat track="Nürburgring" count={12} />
      </div>
    </div>

    {/* recent bookings */}
    <div style={{ background:"#151515", padding:24, borderRadius:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <h2 style={{ fontSize:18, color:"#e4e4e4", margin:0 }}>Recent Bookings</h2>
        <button style={{ background:"none", border:"none", color:"#fb7185", cursor:"pointer" }}>View All</button>
      </div>

      <table style={{ width:"100%", color:"#d4d4d4", fontSize:14, borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ color:"#888", textAlign:"left" }}>
            <th>Customer</th><th>Track</th><th>Date</th><th>Time</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          <BookingRow name="John Doe"    track="2F2F"        date="25 Apr 2025" time="14:00" status="Confirmed" />
          <BookingRow name="Jane Smith"  track="Monza"       date="26 Apr 2025" time="10:30" status="Pending"   />
          <BookingRow name="Alex Johnson"track="2F2F"        date="27 Apr 2025" time="16:15" status="Confirmed" />
          <BookingRow name="Sam Wilson"  track="Nürburgring" date="28 Apr 2025" time="09:00" status="Cancelled" />
        </tbody>
      </table>
    </div>
  </div>
);

const TracksView   = () => <div style={{ color:"#aaa" }}>Track management coming soon…</div>;
const BookingsView = () => <div style={{ color:"#aaa" }}>Booking management coming soon…</div>;

/* ——— main component ——— */
const EmployeeDashboard = () => {
  const [active, setActive] = useState("dashboard");

  const Page = active === "tracks"
      ? TracksView
      : active === "bookings"
      ? BookingsView
      : DashboardView;

  const Nav = ({ id, label }) => (
    <div
      role="button"
      onClick={() => setActive(id)}
      style={{
        position:"relative",
        width:240,
        height:44,
        margin:"0 auto 12px",
        cursor:"pointer"
      }}
    >
      <span style={{
        position:"absolute", left:40, top:12,
        fontWeight:600,
        color: active===id ? "#fb7185" : "#f7f4f1"
      }}>{label}</span>
      <span style={{
        position:"absolute", inset:0,
        borderRadius:10,
        border:`2px solid ${active===id ? "#a81b1b" : "transparent"}`
      }} />
    </div>
  );

  return (
    <div style={{
      width:"100%", height:"100vh", position:"relative",
      background:"linear-gradient(90deg,black 26%,#1B1B1B 53%,#1F1F1F 74%,#242424 83%,#272727 93%)",
      overflow:"hidden"
    }}>
      {/* reuse existing universal nav + avatar */}
      <SideNavBar />
      <UserProfile style={{ position:"absolute", top:30, right:40 }} />

      {/* our employee-specific sidebar overlaying the generic one */}
      <div style={{
        position:"absolute", top:120, left:0, width:285, paddingTop:20
      }}>
        <h3 style={{ color:"#c9c0c0", fontSize:12, marginLeft:45, marginBottom:28 }}>EMPLOYEE PORTAL</h3>
        <Nav id="dashboard" label="Dashboard" />
        <Nav id="tracks"    label="Track Management" />
        <Nav id="bookings"  label="Booking Management" />
      </div>

      {/* main panel */}
      <div style={{ position:"absolute", left:315, right:30, top:120, bottom:30, overflow:"auto" }}>
        <Page />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
