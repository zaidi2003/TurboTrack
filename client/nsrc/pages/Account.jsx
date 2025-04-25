import React from "react";
import { Link } from "react-router-dom";


const Account = () => {
  const userData = {
    username: "username",
  }

  const username = (userData && userData.username) || "username";
  return (
    <div
      style={{
        width: "100%",
        height: 982,
        position: "relative",
        opacity: 0.9,
        background:
          "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
        overflow: "hidden",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: 285,
          height: 982,
          position: "absolute",
          left: 0,
          top: 0,
          opacity: 0.6,
          background:
            "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
          border: "2px rgba(242.99, 242.99, 242.99, 0.20) solid",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 45,
              top: 43,
              opacity: 0.8,
              color: "#D5D4D4",
              fontSize: 25,
              fontFamily: "Zen Dots",
              fontWeight: 400,
              letterSpacing: 2.5,
              cursor: "pointer",
            }}
          >
            turbotrack
          </div>
        </Link>

        {/* Divider */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 105,
            width: 285,
            height: 0,
            opacity: 0.3,
            outline: "0.81px #F7F4F1 solid",
            outlineOffset: "-0.41px",
          }}
        />

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
            fontWeight: 700,
          }}
        >
          MAIN
        </div>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 207,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Dashboard
          </div>
        </Link>
        <Link to="/booking" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 263,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Bookings
          </div>
        </Link>
        <Link to="/payments" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 319,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Payments
          </div>
        </Link>

        {/* RACING Section */}
        <div
          style={{
            position: "absolute",
            left: 45,
            top: 416,
            opacity: 0.8,
            color: "#C9C0C0",
            fontSize: 12,
            fontFamily: "Readex Pro",
            fontWeight: 700,
          }}
        >
          RACING
        </div>
        <Link to="/analytics" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 467,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Analytics
          </div>
        </Link>
        <Link to="/current-session" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 523,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Current Session
          </div>
        </Link>
        <Link to="/achievements" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 579,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Achievements
          </div>
        </Link>

        {/* SETTINGS Section */}
        <div
          style={{
            position: "absolute",
            left: 45,
            top: 676,
            opacity: 0.8,
            color: "#C9C0C0",
            fontSize: 12,
            fontFamily: "Readex Pro",
            fontWeight: 700,
          }}
        >
          SETTINGS
        </div>

        {/* Account (Active) */}
        <div
          style={{
            position: "absolute",
            left: 22,
            top: 715,
            width: 241,
            height: 44,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 41,
              top: 12,
              opacity: 0.8,
              color: "#A81129",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: 600,
            }}
          >
            Account
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

        <Link to="/help" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 783,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Help Center
          </div>
        </Link>
        <Link to="/logout" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "absolute",
              left: 63,
              top: 839,
              opacity: 0.8,
              color: "#F7F4F1",
              fontSize: 16,
              fontFamily: "Readex Pro",
              fontWeight: 600,
              cursor: "pointer",
              wordWrap: "break-word",
            }}
          >
            Log Out
          </div>
        </Link>
      </div>

      {/* User Profile */}
      <div
        style={{
          position: "absolute",
          right: "60px",
          top: "40px",
          display: "flex",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: "45.62px",
            height: "42px",
            borderRadius: "50%",
            background: "#C9C0C0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <span style={{ color: "#333", fontSize: 18 }}>👤</span>
        </div>
        <div
          style={{
            color: "#F7F4F1",
            fontSize: "14.4px",
            fontFamily: "Readex Pro, sans-serif",
            fontWeight: "600",
          }}
        >
          {username}
        </div>
      </div>

      {/* EDIT PROFILE Section */}
      <div
        style={{
          width: 674,
          height: 778,
          left: 300,
          top: 144,
          position: "absolute",
          background:
            "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
          borderRadius: 14.57,
          border: "0.73px rgba(115,115,115,0.50) solid",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 314,
          top: 100,
          opacity: 0.8,
          color: "#C9C0C0",
          fontSize: 22,
          fontFamily: "Readex Pro",
          fontWeight: 700,
        }}
      >
        EDIT PROFILE
      </div>

      {/* First Name */}
      <div
        style={{
          position: "absolute",
          left: 353,
          top: 207,
          opacity: 0.8,
          color: "#F7F4F1",
          fontSize: 16,
          fontFamily: "Readex Pro",
          fontWeight: 600,
        }}
      >
        First Name
      </div>
      <div style={{ width: 598, height: 53, left: 338, top: 235, position: "absolute" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#C8DCE4",
            borderRadius: 12.18,
            border: "0.81px black solid",
          }}
        />
      </div>

      {/* Last Name */}
      <div
        style={{
          position: "absolute",
          left: 353,
          top: 345,
          opacity: 0.8,
          color: "#F7F4F1",
          fontSize: 16,
          fontFamily: "Readex Pro",
          fontWeight: 600,
        }}
      >
        Last Name
      </div>
      <div style={{ width: 598, height: 53, left: 338, top: 376, position: "absolute" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#C8DCE4",
            borderRadius: 12.18,
            border: "0.81px black solid",
          }}
        />
      </div>

      {/* Username */}
      <div
        style={{
          position: "absolute",
          left: 353,
          top: 491,
          opacity: 0.8,
          color: "#F7F4F1",
          fontSize: 16,
          fontFamily: "Readex Pro",
          fontWeight: 600,
        }}
      >
        Username
      </div>
      <div style={{ width: 598, height: 53, left: 338, top: 523, position: "absolute" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#C8DCE4",
            borderRadius: 12.18,
            border: "0.81px black solid",
          }}
        />
      </div>

      {/* Phone Number */}
      <div
        style={{
          position: "absolute",
          left: 353,
          top: 626,
          opacity: 0.8,
          color: "#F7F4F1",
          fontSize: 16,
          fontFamily: "Readex Pro",
          fontWeight: 600,
        }}
      >
        Phone Number
      </div>
      <div style={{ width: 598, height: 53, left: 338, top: 662, position: "absolute" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#C8DCE4",
            borderRadius: 12.18,
            border: "0.81px black solid",
          }}
        />
      </div>

      {/* Email */}
      <div
        style={{
          position: "absolute",
          left: 353,
          top: 770,
          opacity: 0.8,
          color: "#F7F4F1",
          fontSize: 16,
          fontFamily: "Readex Pro",
          fontWeight: 600,
        }}
      >
        Email
      </div>
      <div style={{ width: 598, height: 53, left: 338, top: 803, position: "absolute" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#C8DCE4",
            borderRadius: 12.18,
            border: "0.81px black solid",
          }}
        />
      </div>

      {/* CHANGE PASSWORD Section */}
      <div
        style={{
          width: 400,
          height: 351,
          left: 1000,
          top: 144,
          position: "absolute",
          background:
            "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
          borderRadius: 20.1,
          border: "0.5px rgba(115,115,115,0.50) solid",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1010,
          top: 100,
          opacity: 0.8,
          color: "#C9C0C0",
          fontSize: 22,
          fontFamily: "Readex Pro",
          fontWeight: 700,
        }}
      >
        CHANGE PASSWORD
      </div>

      {/* Current Password */}
      <div
        style={{
          position: "absolute",
          left: 1050,
          top: 163,
          opacity: 0.8,
          color: "#F7F4F1",
          fontSize: 16,
          fontFamily: "Readex Pro",
          fontWeight: 600,
        }}
      >
        Current Password
      </div>
      <div style={{ width: 340, height: 52.77, left: 1030, top: 197, position: "absolute" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#C8DCE4",
            borderRadius: 12.18,
            border: "0.81px black solid",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 15,
            opacity: 0.6,
            color: "#737373",
            fontSize: 18,
            fontFamily: "Readex Pro",
            fontWeight: 200,
            letterSpacing: 0.9,
          }}
        >
          Current Password
        </div>
      </div>

      {/* New Password */}
      <div
        style={{
          position: "absolute",
          left: 1050,
          top: 273,
          opacity: 0.8,
          color: "#F7F4F1",
          fontSize: 16,
          fontFamily: "Readex Pro",
          fontWeight: 600,
        }}
      >
        New Password
      </div>
      <div style={{ width: 340, height: 52.77, left: 1030, top: 303, position: "absolute" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#C8DCE4",
            borderRadius: 12.18,
            border: "0.81px black solid",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 15,
            opacity: 0.6,
            color: "#737373",
            fontSize: 18,
            fontFamily: "Readex Pro",
            fontWeight: 200,
            letterSpacing: 0.9,
          }}
        >
          New Password
        </div>
      </div>

      {/* Confirm Password */}
      <div
        style={{
          position: "absolute",
          left: 1050,
          top: 389,
          opacity: 0.8,
          color: "#F7F4F1",
          fontSize: 16,
          fontFamily: "Readex Pro",
          fontWeight: 600,
        }}
      >
        Confirm Password
      </div>
      <div style={{ width: 340, height: 52.77, left: 1030, top: 416, position: "absolute" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#C8DCE4",
            borderRadius: 12.18,
            border: "0.81px black solid",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 15,
            opacity: 0.6,
            color: "#737373",
            fontSize: 18,
            fontFamily: "Readex Pro",
            fontWeight: 200,
            letterSpacing: 0.9,
          }}
        >
          Confirm Password
        </div>
      </div>
    </div>
  );
};

export default Account;