import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateAccountDetails = ({ userData: initialUserData, onAccountUpdate }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate data
      if (!userData.name || !userData.email) {
        toast.error("Please fill all required fields");
        setLoading(false);
        return;
      }

      toast.info("This feature is not yet available. Profile information display only.");
      
      // Since there's no direct API to update user details except for password and profile picture,
      // we'll just display a message instead of making an API call
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.msg || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "rgba(30, 30, 30, 0.7)",
        borderRadius: 15,
        border: "1px solid #3d3d3d",
        padding: "20px",
        width: "100%",
        height: "100%",
        marginBottom: "0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            marginRight: 8,
            opacity: 0.8,
          }}
        >
          👤
        </div>
        <div
          style={{
            color: "#f7f4f1",
            fontFamily: "Readex Pro, sans-serif",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          EDIT PROFILE
        </div>
      </div>

      <form onSubmit={handleProfileSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 15,
          }}
        >
          {/* Name */}
          <div>
            <label
              style={{
                display: "block",
                color: "#f7f4f1",
                fontFamily: "Readex Pro, sans-serif",
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              Username <span style={{ color: "#ff7575" }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleUserDataChange}
              style={{
                width: "100%",
                height: 38,
                background: "rgba(240, 240, 240, 0.1)",
                border: "none",
                borderRadius: 8,
                padding: "0 12px",
                color: "#f7f4f1",
                fontSize: 14,
              }}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                color: "#f7f4f1",
                fontFamily: "Readex Pro, sans-serif",
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              Email <span style={{ color: "#ff7575" }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleUserDataChange}
              style={{
                width: "100%",
                height: 38,
                background: "rgba(240, 240, 240, 0.1)",
                border: "none",
                borderRadius: 8,
                padding: "0 12px",
                color: "#f7f4f1",
                fontSize: 14,
              }}
              required
            />
          </div>
        </div>

        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "linear-gradient(90deg, #300101 6%, #7b0303 50%, #960404 95%)",
              border: "none",
              borderRadius: 8,
              padding: "8px 20px",
              color: "#f7f4f1",
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccountDetails;