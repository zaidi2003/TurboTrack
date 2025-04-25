import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateProfilePicture = ({ initialImage, onProfileUpdate }) => {
  const [selectedProfilePicture, setSelectedProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);

  // Available profile picture options from backend
  const profilePicOptions = [
    "https://api.dicebear.com/7.x/bottts/svg?seed=kartingFunk",
    "https://api.dicebear.com/7.x/pixel-art/svg?seed=kartPilot",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=MeowRacer",
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=GhostKart",
    "https://api.dicebear.com/7.x/micah/svg?seed=AlienDriver"
  ];

  // Handle profile picture selection
  const handleProfilePictureSelect = (pictureUrl) => {
    setSelectedProfilePicture(pictureUrl);
  };

  // Handle profile picture update
  const handleProfilePictureUpdate = async () => {
    if (!selectedProfilePicture) {
      toast.info("Please select a profile picture");
      return;
    }

    setLoading(true);

    try {
      // Get authentication token
      const rawToken = localStorage.getItem("auth");
      const token = rawToken ? rawToken.replace(/^"|"$/g, "") : "";

      if (!token) {
        toast.error("You need to be logged in to update your profile");
        setLoading(false);
        return;
      }

      // Call API endpoint to update profile picture
      console.log("Updating profile picture with:", selectedProfilePicture);
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/update-profile-picture",
        { profilePicture: selectedProfilePicture },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      // Handle successful response
      console.log("Profile picture update response:", response.data);
      toast.success(response.data.msg || "Profile picture updated successfully!");
      
      // Notify parent component about the update
      if (onProfileUpdate) {
        onProfileUpdate(selectedProfilePicture);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
      }
      toast.error(error.response?.data?.msg || "Failed to update profile picture");
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
        width: "100%", // Take full width of parent container
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
          📷
        </div>
        <div
          style={{
            color: "#f7f4f1",
            fontFamily: "Readex Pro, sans-serif",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          PROFILE PICTURE
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            width: 120, // Smaller profile picture
            height: 120, // Smaller profile picture
            borderRadius: "50%",
            backgroundColor: "#2a2a2a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            border: "3px solid #3d3d3d",
          }}
        >
          {selectedProfilePicture || initialImage ? (
            <img
              src={selectedProfilePicture || initialImage}
              alt="Profile Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 50, color: "#c0c0c0" }}>👤</span>
          )}
        </div>

        {/* Avatar selection grid */}
        <div style={{ width: "100%", marginTop: 10 }}>
          <p style={{ color: "#f7f4f1", fontSize: 12, marginBottom: 8, textAlign: "center" }}>
            Select an avatar:
          </p>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: 6,
            marginBottom: 12 
          }}>
            {profilePicOptions.map((pic, index) => (
              <div
                key={index}
                onClick={() => handleProfilePictureSelect(pic)}
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  borderRadius: "50%",
                  backgroundColor: "#2a2a2a",
                  overflow: "hidden",
                  border: selectedProfilePicture === pic ? "3px solid #7b0303" : "3px solid #3d3d3d",
                  cursor: "pointer",
                }}
              >
                <img
                  src={pic}
                  alt={`Avatar ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleProfilePictureUpdate}
          disabled={loading || !selectedProfilePicture}
          style={{
            background: !selectedProfilePicture ? "#3d3d3d" : "linear-gradient(90deg, #300101 6%, #7b0303 50%, #960404 95%)",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            width: "80%",
            color: "#f7f4f1",
            fontSize: 13,
            fontWeight: 600,
            cursor: loading || !selectedProfilePicture ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Updating..." : "Update Avatar"}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;