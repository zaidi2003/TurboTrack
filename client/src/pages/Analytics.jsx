import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserProfile, SideNavBar } from "../components";
import { useUser } from "../context/UserContext";
import "../styles/common-components.css";

const Analytics = () => {
  const { userData, isLoading } = useUser();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({});
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const fetchUserInfo = async () => {
    setAnalyticsLoading(true);
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/times`, axiosConfig);      
      setData(data);
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []); // run only once

  // Loading spinner component from Dashboard.jsx
  const LoadingSpinner = () => (
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
      <div>Loading your analytics...</div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (isLoading || analyticsLoading) {
    return <LoadingSpinner />;
  }
      
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
          top: 133,
          color: "#C9C0C0",
          fontSize: 23,
          fontFamily: "Readex Pro",
          fontWeight: "550",
          marginBottom: 30,
        }}
      >
        Your Analytics
      </div>

      <div
        style={{
          position: "absolute",
          left: 363,
          top: 200,
          width: "calc(100% - 400px)",
          maxWidth: "1200px",
          zIndex: 5,
        }}
      >
        {data?.aggregatedTimes ? (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: 20,
              padding: 25,
              marginBottom: 30,
              color: "#f7f4f1",
              fontFamily: "Readex Pro, sans-serif",
            }}
          >
            <div
              style={{
                color: "#c9c0c0",
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 20,
                borderBottom: "2px solid #787878",
                paddingBottom: 10,
                width: "fit-content",
              }}
            >
              AGGREGATED TIMES
            </div>
            <pre
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                padding: 15,
                borderRadius: 10,
                overflowX: "auto",
                fontFamily: "monospace",
                color: "#c0c0c0",
                fontSize: 14,
              }}
            >
              {JSON.stringify(data.aggregatedTimes, null, 2)}
            </pre>
          </div>
        ) : (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: 20,
              padding: 25,
              marginBottom: 30,
              color: "#c0c0c0",
              fontFamily: "Readex Pro, sans-serif",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            No analytics data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;