import React, { useState, useEffect } from "react";
import { SideNavBar, UserProfile } from "../components";
import axios from "axios";
import { toast } from "react-toastify";

import UpdateProfilePicture from "../components/account/UpdateProfilePicture";
import UpdateAccountDetails from "../components/account/UpdateAccountDetails";
import ChangePassword from "../components/account/ChangePassword";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const rawToken = localStorage.getItem("auth");
        const token = rawToken ? rawToken.replace(/^"|"$/g, "") : "";
        
        if (!token) {
          toast.error("You are not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/v1/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.user) {
          setUserData(response.data.user);
        } else {
          toast.error("Failed to load user profile data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error(error.response?.data?.msg || "Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "982px",
        position: "relative",
        background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
        overflow: "hidden",
        paddingBottom: "40px",
      }}
    >
      <SideNavBar />
      <UserProfile style={{ position: "absolute", top: 30, right: 40 }} />

      <div
        style={{
          position: "absolute",
          left: 363,
          top: 100,
          width: "calc(100% - 400px)",
          maxWidth: "1200px",
          zIndex: 5,
        }}
      >
        <h1
          style={{
            color: "#c9c0c0",
            fontSize: 26,
            fontFamily: "Readex Pro, sans-serif",
            fontWeight: 700,
            marginBottom: 30,
          }}
        >
          ACCOUNT SETTINGS
        </h1>

        {loading ? (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            color: "#f7f4f1",
            fontFamily: "Readex Pro, sans-serif",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ marginBottom: 20, fontSize: 18 }}>Loading account information...</div>
              <div 
                style={{ 
                  width: 40, 
                  height: 40, 
                  border: "3px solid rgba(255, 255, 255, 0.1)", 
                  borderTop: "3px solid #a81129",
                  borderRadius: "50%",
                  margin: "0 auto",
                  animation: "spin 1s linear infinite",
                }}
              />
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </div>
        ) : !userData ? (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            color: "#f7f4f1",
            fontFamily: "Readex Pro, sans-serif",
            fontSize: 18,
          }}>
            Unable to load profile information. Please try again later.
          </div>
        ) : (
          <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
            <UpdateProfilePicture initialImage={userData.profileImage} />
            <UpdateAccountDetails userData={userData} />
            <ChangePassword />
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;