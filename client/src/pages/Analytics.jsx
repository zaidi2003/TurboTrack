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
      const { data } = response;
      console.log("User data:", data);
      setData(data);
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []); // run only once

      
  return (
    <body>
      {/* Rendering the aggregatedTimes if available */}
      {data?.aggregatedTimes ? (
        <div>
          <h2>Aggregated Times</h2>
          <pre>{JSON.stringify(data.aggregatedTimes, null, 2)}</pre>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </body>
  );
};

export default Analytics;
