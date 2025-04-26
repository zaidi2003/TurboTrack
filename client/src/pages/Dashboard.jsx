import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserProfile, SideNavBar } from "../components";
import { WelcomeCard, JourneyCard, LeaderboardSection } from "../components/dashboard";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

import "../styles/common-components.css";

const Dashboard = () => {
  const { userData, userStats, isLoading } = useUser();
  const [leaderboardData, setLeaderboardData] = useState([]);


  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/dashboard/leaderboard`);
      setLeaderboardData(response.data.users || []);
    } catch (error) {
      toast.error("Failed to fetch leaderboard");
      console.error(error);
    }
  };


  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (isLoading) 
    return <div>Loading...</div>;
  else if (!(userData.role === "Customer"))
    return <Navigate to="/dashboard" replace />;

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "18px",
          fontFamily: "Readex Pro",
        }}
      >
        <div style={{ 
          width: "40px", 
          height: "40px", 
          border: "4px solid rgba(255, 255, 255, 0.1)", 
          borderRadius: "50%",
          borderTop: "4px solid #B81515",
          animation: "spin 1s linear infinite",
          marginBottom: "15px"
        }} />
        <div>Loading your dashboard...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: 982,
        position: "relative",
        background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
        overflow: "hidden",
      }}
    >
      <SideNavBar />
      
      <UserProfile style={{ position: "absolute", top: 30, right: 40 }} />

      <WelcomeCard 
        style={{
          position: "absolute",
          left: 363,
          top: 30,
          width: 581,
          height: 179.94,
        }}
      />

      <JourneyCard 
        style={{
          position: "absolute",
          left: 363,
          top: 268,
          width: 581,
          height: 700,
        }}
      />

      <div style={{
        position: "absolute",
        top: "0px",
        left: "1015px",
        height: "982px",
        width: "1px",
        backgroundColor: "#F7F4F1",
        opacity: 0.3
      }} />

      <div
        style={{
          position: "absolute",
          left: 1057,
          top: 133,
          color: "#C9C0C0",
          fontSize: 23,
          fontFamily: "Readex Pro",
          fontWeight: "550",
        }}
      >
        Community Leaderboard
      </div>
   
      <LeaderboardSection 
        leaderboardData={leaderboardData}
        style={{
          position: "absolute",
          left: 1057,
          top: 200,
          width: 343,
        }}
      />
    </div>
  );
};

export default Dashboard;