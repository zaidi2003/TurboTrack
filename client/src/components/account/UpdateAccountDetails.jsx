import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateAccountDetails = ({ userData: initialUserData }) => {
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
      if (!userData.firstName || !userData.lastName || !userData.email) {
        toast.error("Please fill all required fields");
        setLoading(false);
        return;
      }

      // Get authentication token
      const rawToken = localStorage.getItem("auth");
      const token = rawToken ? rawToken.replace(/^"|"$/g, "") : "";

      // Call API endpoint to update profile
      const response = await axios.put(
        "http://localhost:3000/api/v1/users/update-profile",
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          email: userData.email,
          phone: userData.phone
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success
      toast.success(response.data.msg || "Profile updated successfully!");
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
        padding: "30px",
        flex: 1,
        minWidth: "300px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            marginRight: 10,
            opacity: 0.8,
          }}
        >
          👤
        </div>
        <div
          style={{
            color: "#f7f4f1",
            fontFamily: "Readex Pro, sans-serif",
            fontSize: 18,
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
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 20,
          }}
        >
          {/* First Name */}
          <div>
            <label
              style={{
                display: "block",
                color: "#f7f4f1",
                fontFamily: "Readex Pro, sans-serif",
                fontSize: 14,
                marginBottom: 8,
              }}
            >
              First Name <span style={{ color: "#ff7575" }}>*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleUserDataChange}
              style={{
                width: "100%",
                height: 45,
                background: "rgba(240, 240, 240, 0.1)",
                border: "none",
                borderRadius: 8,
                padding: "0 15px",
                color: "#f7f4f1",
                fontSize: 16,
              }}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              style={{
                display: "block",
                color: "#f7f4f1",
                fontFamily: "Readex Pro, sans-serif",
                fontSize: 14,
                marginBottom: 8,
              }}
            >
              Last Name <span style={{ color: "#ff7575" }}>*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleUserDataChange}
              style={{
                width: "100%",
                height: 45,
                background: "rgba(240, 240, 240, 0.1)",
                border: "none",
                borderRadius: 8,
                padding: "0 15px",
                color: "#f7f4f1",
                fontSize: 16,
              }}
              required
            />
          </div>

          {/* Username */}
          <div>
            <label
              style={{
                display: "block",
                color: "#f7f4f1",
                fontFamily: "Readex Pro, sans-serif",
                fontSize: 14,
                marginBottom: 8,
              }}
            >
              Username <span style={{ color: "#ff7575" }}>*</span>
            </label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleUserDataChange}
              style={{
                width: "100%",
                height: 45,
                background: "rgba(240, 240, 240, 0.1)",
                border: "none",
                borderRadius: 8,
                padding: "0 15px",
                color: "#f7f4f1",
                fontSize: 16,
              }}
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              style={{
                display: "block",
                color: "#f7f4f1",
                fontFamily: "Readex Pro, sans-serif",
                fontSize: 14,
                marginBottom: 8,
              }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleUserDataChange}
              style={{
                width: "100%",
                height: 45,
                background: "rgba(240, 240, 240, 0.1)",
                border: "none",
                borderRadius: 8,
                padding: "0 15px",
                color: "#f7f4f1",
                fontSize: 16,
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                color: "#f7f4f1",
                fontFamily: "Readex Pro, sans-serif",
                fontSize: 14,
                marginBottom: 8,
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
                height: 45,
                background: "rgba(240, 240, 240, 0.1)",
                border: "none",
                borderRadius: 8,
                padding: "0 15px",
                color: "#f7f4f1",
                fontSize: 16,
              }}
              required
            />
          </div>
        </div>

        <div style={{ marginTop: 30, display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "linear-gradient(90deg, #300101 6%, #7b0303 50%, #960404 95%)",
              border: "none",
              borderRadius: 8,
              padding: "10px 30px",
              color: "#f7f4f1",
              fontSize: 16,
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