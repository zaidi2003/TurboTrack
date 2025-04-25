import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserProfile, SideNavBar } from "../components";
import { WelcomeCard, JourneyCard, LeaderboardSection } from "../components/dashboard";
import { useUser } from "../context/UserContext";
import "../styles/common-components.css";



const Analytics = () => {
  const { userData, userStats, isLoading } = useUser();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({});

  const fetchUserInfo = async () => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/times`, axiosConfig);      
      console.log(response.data);
      //setData({ msg, secret, email, username, wins, podiums, sessions, role });
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []); // run only once

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

      {/* You can now display the trackStats
      <div style={{ position: "absolute", top: 120, left: 40, color: "white" }}>
        <h2>Track Stats</h2>
        <pre>{JSON.stringify(trackStats, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default Analytics;
