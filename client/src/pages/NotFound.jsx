import React, { useState } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        background:
          "linear-gradient(90deg, black 26%, #1b1b1b 53%, #1f1f1f 74%, #242424 83%, #272727 93%)", // Updated gradient background
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 4rem",
        }}
      >
        <div
          style={{
            fontSize: "2rem",
            fontFamily: "Zen Dots",
            letterSpacing: 3,
            fontWeight: "400",
            color: "#fff",
          }}
        >
          turbotrack
        </div>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Link
            to="/about-us"
            style={{
              color: "#ffffff",
              fontFamily: "Readex Pro",
              fontWeight: "200",
              textDecoration: "none",
            }}
          >
            About Us
          </Link>
          <Link
            to="/services"
            style={{
              color: "#ffffff",
              fontFamily: "Readex Pro",
              fontWeight: "200",
              textDecoration: "none",
            }}
          >
            Services
          </Link>
          <Link
            to="/login"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              background:
                "linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)",
              fontFamily: "Readex Pro",
              padding: "0.5rem 1.5rem",
              borderRadius: "20px",
              fontSize: "1rem",
            }}
          >
            Login
          </Link>
        </div>
      </div>

      {/* Red Gradient Line */}
      <div
        style={{
          width: "100%",
          height: 10.65,
          background:
            "linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)",
          border: "1px black solid",
        }}
      />

      {/* 404 Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "120px",
            fontWeight: "700",
            color: "#fff",
            margin: "0",
            fontFamily: "'Readex Pro', sans-serif",
          }}
        >
          404
        </h1>
        <div
          style={{
            width: "200px",
            height: "5px",
            background: "#960404",
            margin: "20px 0",
          }}
        ></div>
        
        <Link
          to="/"
          onMouseEnter={() => setIsHovered(true)} // Mouse enters
          onMouseLeave={() => setIsHovered(false)} // Mouse leaves
          style={{
            fontSize: "18px",
            color: "#fff",
            textDecoration: "none",
            fontWeight: "600",
            border: "2px solid #fff",
            padding: "10px 20px",
            borderRadius: "5px",
            transition: "0.3s",
            backgroundColor: isHovered ? "#960404" : "transparent", // Change background color on hover
            cursor: "pointer",
          }}
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
