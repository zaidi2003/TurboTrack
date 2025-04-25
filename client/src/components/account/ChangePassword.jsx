import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ChangePassword = () => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle password field changes
  const handlePasswordChange = (e, field) => {
    const value = e.target.value;
    if (field === 'currPassword') setCurrPassword(value);
    else if (field === 'newPassword') setNewPassword(value);
    else if (field === 'confirmPassword') setConfirmPassword(value);
  };

  // Handle password change submission
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation checks
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
      // Get authentication token
      const rawToken = localStorage.getItem("auth");
      const token = rawToken ? rawToken.replace(/^"|"$/g, "") : "";

      // Call API endpoint - matching exactly what the backend expects
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/change-password",
        { 
          currPassword, 
          newPassword 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success
      toast.success(response.data.msg || "Password updated successfully!");
      
      // Reset password fields
      setCurrPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.msg || "Failed to update password");
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
        marginTop: 0, // Remove margin to move it up
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
          🔒
        </div>
        <div
          style={{
            color: "#f7f4f1",
            fontFamily: "Readex Pro, sans-serif",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          CHANGE PASSWORD
        </div>
      </div>

      <form onSubmit={handleChangePassword}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 15,
          }}
        >
          {/* Current Password */}
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
              Current Password
            </label>
            <input
              type="password"
              placeholder="Current Password"
              value={currPassword}
              onChange={(e) => handlePasswordChange(e, 'currPassword')}
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

          {/* New Password */}
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
              New Password
            </label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => handlePasswordChange(e, 'newPassword')}
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

          {/* Confirm Password */}
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
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => handlePasswordChange(e, 'confirmPassword')}
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
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;