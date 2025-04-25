import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateProfilePicture = ({ initialImage }) => {
  const [profileImagePreview, setProfileImagePreview] = useState(initialImage);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfileImagePreview(previewUrl);
      
      // Store the file for upload
      setProfileImage(file);
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!profileImage) {
      toast.info("Please select an image to upload");
      return;
    }

    setLoading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("profileImage", profileImage);

      // Get token for authorization
      const rawToken = localStorage.getItem("auth");
      const token = rawToken ? rawToken.replace(/^"|"$/g, "") : "";

      // Call API to upload image
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/update-profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.msg || "Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
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
        padding: "30px",
        width: "300px",
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
          📷
        </div>
        <div
          style={{
            color: "#f7f4f1",
            fontFamily: "Readex Pro, sans-serif",
            fontSize: 18,
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
          gap: 20,
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            backgroundColor: "#2a2a2a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            border: "3px solid #3d3d3d",
          }}
        >
          {profileImagePreview ? (
            <img
              src={profileImagePreview}
              alt="Profile Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 60, color: "#c0c0c0" }}>👤</span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "80%" }}>
          <label
            style={{
              background: "linear-gradient(90deg, #300101 6%, #7b0303 50%, #960404 95%)",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              color: "#f7f4f1",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Select Photo
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </label>
          
          {profileImage && (
            <button
              onClick={handleImageUpload}
              disabled={loading}
              style={{
                background: "rgba(240, 240, 240, 0.1)",
                border: "1px solid #3d3d3d",
                borderRadius: 8,
                padding: "10px 20px",
                color: "#f7f4f1",
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;