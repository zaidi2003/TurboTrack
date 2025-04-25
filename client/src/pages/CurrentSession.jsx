import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserProfile, SideNavBar } from "../components";
import { WelcomeCard, JourneyCard, LeaderboardSection } from "../components/dashboard";
import { useUser } from "../context/UserContext";
import { GoogleMap, LoadScript, Marker, Polygon, useLoadScript } from "@react-google-maps/api";
import "../styles/common-components.css";



const containerStyle = {
  width: "100%",
  height: "100vh",  
};

const center = {
  lat: 31.5409,  
  lng: 74.4149,  
};




const CurrentSession = () => {
  const { userData, userStats, isLoading } = useUser();

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({});
  const fetchCoordinates = async () => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/gps/`, axiosConfig);
      const { coordinates } = response.data;
      setData(coordinates);
      console.log("Coordinates data:", coordinates);
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    }
  };

  const rectangleCoords = [
    { lat: 31.5500, lng: 74.3500 },  
    { lat: 31.5500, lng: 74.4200 },  
    { lat: 31.5300, lng: 74.4200 },  
    { lat: 31.5300, lng: 74.3500 },  
  ];
  
  useEffect(() => {
    fetchCoordinates();
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
        height: "100vh",
        position: "relative",
        background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
        overflow: "hidden",
      }}
    >
      <SideNavBar />
      <UserProfile
        style={{
          position: "absolute", 
          top: "30px", 
          right: "40px", 
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.6)", 
          padding: "10px",
          borderRadius: "10px",
        }} 
      />

      <LoadScript googleMapsApiKey="AIzaSyCGPPHPMaswMl3qX-x9QRlK4nzUUT2vItY">
      <GoogleMap
  mapContainerStyle={containerStyle}
  center={center}
  zoom={18}
  onLoad={() => console.log('Map loaded!')}  
>
  <Marker position={center} />
  
  <Polygon
    paths={rectangleCoords}
    options={{
      fillColor: "#FF0000", 
      fillOpacity: 0.4, 
      strokeColor: "#FF0000", 
      strokeOpacity: 1,
      strokeWeight: 2,
    }}
    onLoad={(polygon) => console.log("Polygon loaded:", polygon)}  
  />
</GoogleMap>

      </LoadScript>
    </div>
  );
};

export default CurrentSession;
