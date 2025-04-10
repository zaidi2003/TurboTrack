import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    if (newPassword === currPassword) {
      toast.error("New password cannot be the same as the old password!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/change-password`, // Using base URL from environment variables
        { currPassword, newPassword },
        {
          headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add your auth token here
          },
        }
      );

      toast.success(response.data.msg);
      setCurrPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background:
          "linear-gradient(90deg, black 26%, #1b1b1b 53%, #1f1f1f 74%, #242424 83%, #272727 93%)", // Background Gradient
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

      {/* Change Password Section */}
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
            fontSize: "50px",
            fontWeight: "700",
            color: "#fff",
            margin: "0",
            fontFamily: "'Readex Pro', sans-serif",
          }}
        >
          Change Password
        </h1>

        <div
          style={{
            width: "200px",
            height: "5px",
            background: "#960404",
            margin: "20px 0",
          }}
        ></div>

        <form
          onSubmit={handleChangePassword}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "300px",
          }}
        >
          <input
            type="password"
            placeholder="Current Password"
            value={currPassword}
            onChange={(e) => setCurrPassword(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#2f2f2f",
              color: "#fff",
            }}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#2f2f2f",
              color: "#fff",
            }}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#2f2f2f",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#960404",
              color: "#fff",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.3s",
            }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <Link
          to="/"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            fontSize: "18px",
            color: "#fff",
            textDecoration: "none",
            fontWeight: "600",
            border: "2px solid #fff",
            padding: "10px 20px",
            borderRadius: "5px",
            transition: "0.3s",
            backgroundColor: isHovered ? "#960404" : "transparent",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ChangePassword;
