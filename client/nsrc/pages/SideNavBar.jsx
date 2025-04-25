import { Link } from "react-router-dom";

const SideNavbar = () => {
  return (
    <div
      style={{
        width: 285,
        height: 982,
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0.6,
        background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
        border: "2px rgba(242,242,242,0.20) solid",
      }}
    >
      {/* Logo */}
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 43,
          opacity: 0.80,
          color: '#D5D4D4',
          fontSize: 25,
          fontFamily: "Zen Dots",
          fontWeight: "400",
          letterSpacing: 2.5,
          cursor: "pointer",
        }}
      >
        turbotrack
      </div>

      {/* MAIN Section */}
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 156,
          opacity: 0.8,
          color: "#C9C0C0",
          fontSize: 12,
          fontFamily: "Readex Pro",
          fontWeight: "700",
        }}
      >
        MAIN
      </div>

      {/* Dashboard Active */}
      <div style={{ position: "absolute", left: 22, top: 195, width: 241, height: 44 }}>
        <div
          style={{
            position: "absolute",
            left: 41,
            top: 12,
            opacity: 0.8,
            color: "#A81129",
            fontSize: 16,
            fontFamily: "Readex Pro",
            fontWeight: "600",
          }}
        >
          Dashboard
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 241,
            height: 44,
            borderRadius: 10,
            border: "2px #300101 solid",
          }}
        />
      </div>

      {/* Links */}
      {[
        { label: "Bookings", to: "/bookings", top: 263 },
        { label: "Change Password", to: "/change-password", top: 319 },
        { label: "Analytics", to: "/analytics", top: 467 },
        { label: "Current Session", to: "/current-session", top: 523 },
        { label: "Achievements", to: "/achievements", top: 579 },
        { label: "Account", to: "/account", top: 727 },
        { label: "Help Center", to: "/help", top: 783 },
        { label: "Log Out", to: "/logout", top: 839 },
      ].map(({ label, to, top }) => (
        <Link key={label} to={to} style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {label}
          </div>
        </Link>
      ))}

      {/* Section Headings */}
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 416,
          opacity: 0.8,
          color: "#C9C0C0",
          fontSize: 12,
          fontFamily: "Readex Pro",
          fontWeight: "700",
        }}
      >
        RACING
      </div>
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 676,
          opacity: 0.8,
          color: "#C9C0C0",
          fontSize: 12,
          fontFamily: "Readex Pro",
          fontWeight: "700",
        }}
      >
        SETTINGS
      </div>
    </div>
  );
};

export default SideNavbar;
