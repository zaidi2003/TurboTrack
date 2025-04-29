import React, { useState, useEffect } from "react";
import { SideNavBar, UserProfile, EmployeeSideNavBar } from "../components";
import axios from "axios";
import { useUser } from "../context/UserContext";

import { toast } from "react-toastify";

import UpdateProfilePicture from "../components/account/UpdateProfilePicture";
import UpdateAccountDetails from "../components/account/UpdateAccountDetails";
import ChangePassword from "../components/account/ChangePassword";

const Account = () => {
  let { userData: fetchedUserData, userStats, isLoading } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to trigger refresh of user data
  const refreshUserData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

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
        
        // Extract user info from JWT token
        try {
          const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            
            if (payload && payload.id) {
              // Try to fetch more detailed user data from the stats endpoint
              try {
                const statsResponse = await axios.get(
                  "http://localhost:3000/api/v1/users/stats",
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                
                if (statsResponse.data.users && Array.isArray(statsResponse.data.users)) {
                  // Find current user in the stats
                  const currentUser = statsResponse.data.users.find(
                    user => user._id === payload.id || user.name === payload.name
                  );
                  
                  if (currentUser) {
                    setUserData({
                      _id: currentUser._id,
                      name: currentUser.name,
                      email: payload.email || currentUser.email || "user@example.com", 
                      wins: currentUser.wins || 0,
                      podiums: currentUser.podiums || 0,
                      sessions: currentUser.sessions || 0,
                      profilePicture: currentUser.profilePicture || null
                    });
                  } else {
                    // Fall back to basic info from the token
                    setUserData({
                      _id: payload.id,
                      name: payload.name || "User",
                      email: "user@example.com", // Placeholder - JWT might not contain email
                      wins: 0,
                      podiums: 0,
                      sessions: 0,
                      profilePicture: null
                    });
                  }
                } else {
                  throw new Error("Invalid stats response");
                }
              } catch (statsError) {
                console.error("Error fetching stats:", statsError);
                
                // Even if stats fails, we can still show basic user info from token
                setUserData({
                  _id: payload.id,
                  name: payload.name || "User",
                  email: "user@example.com", // Placeholder
                  wins: 0,
                  podiums: 0,
                  sessions: 0,
                  profilePicture: null
                });
              }
            } else {
              throw new Error("Invalid token payload");
            }
          } else {
            throw new Error("Invalid token format");
          }
        } catch (tokenError) {
          console.error("Error parsing token:", tokenError);
          toast.error("Invalid authentication token");
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user profile");
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [refreshTrigger]);

  // Callback for when profile picture is updated
  const handleProfilePictureUpdate = (newProfilePicture) => {
    setUserData(prev => prev ? {
      ...prev,
      profilePicture: newProfilePicture
    } : null);
    refreshUserData();
  };

  // Callback for when account details are updated
  const handleAccountUpdate = (updatedData) => {
    setUserData(prev => prev ? {
      ...prev,
      ...updatedData
    } : null);
    refreshUserData();
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex", 
        background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
        position: "relative", 
        overflow: "visible", 
      }}
    >
      {fetchedUserData.role === "Customer" ? <SideNavBar /> : <EmployeeSideNavBar />}
      <UserProfile style={{ position: "absolute", top: 30, right: 40 }} />

      <div
        style={{
          marginLeft: 330,
          marginTop: 45,
          width: "calc(100% - 350px)",
          maxWidth: "1200px",
          paddingBottom: 60,
          overflow: "visible",
        }}
      >
        <h1
          style={{
            color: "#c9c0c0",
            fontSize: 26,
            fontFamily: "Readex Pro, sans-serif",
            fontWeight: 700,
            marginBottom: 40,
            marginTop: 0,
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
          <div style={{ 
            display: "flex", 
            flexDirection: "column",
            gap: 30, 
            marginBottom: 50, 
          }}>
            {/* First row - Profile Picture and Account Details */}
            <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
              <div style={{ flex: "0 1 260px" }}> {/* Made smaller */}
                <UpdateProfilePicture 
                  initialImage={userData.profilePicture}
                  onProfileUpdate={handleProfilePictureUpdate} 
                />
              </div>
              <div style={{ flex: "1 1 450px" }}> {/* Made smaller, but still flexible */}
                <UpdateAccountDetails 
                  userData={userData}
                  onAccountUpdate={handleAccountUpdate} 
                />
              </div>
            </div>
            
            {/* Second row - Change Password */}
            <div style={{ width: "100%" }}>
              <ChangePassword />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;