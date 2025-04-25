import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserProfile, SideNavBar } from "../components";
import { WelcomeCard, JourneyCard, LeaderboardSection } from "../components/dashboard";
import { useUser } from "../context/UserContext";
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

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: 982,
          position: "relative",
          background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "18px",
          fontFamily: "Readex Pro",
        }}
      >
        Loading dashboard...
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