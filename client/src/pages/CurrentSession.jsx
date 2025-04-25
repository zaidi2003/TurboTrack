import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserProfile, SideNavBar } from "../components";
import { WelcomeCard, JourneyCard, LeaderboardSection } from "../components/dashboard";
import { useUser } from "../context/UserContext";
import { GoogleMap, LoadScript, Marker, Polyline, useLoadScript } from "@react-google-maps/api";
import "../styles/common-components.css";

const containerStyle = {
  width: "100%",
  height: "100vh",  // Ensure the map container takes up full viewport height
};

const center = {
  lat: 31.5409,  
  lng: 74.4149,  
};

const routePath = [
  { lat: 31.5409, lng: 74.4149 },
  { lat: 31.5413, lng: 74.4155 },
  { lat: 31.5417, lng: 74.4160 },
  { lat: 31.5421, lng: 74.4165 },
  { lat: 31.5425, lng: 74.4170 },
  { lat: 31.5430, lng: 74.4175 },
  { lat: 31.5434, lng: 74.4180 },
  { lat: 31.5438, lng: 74.4185 },
  { lat: 31.5442, lng: 74.4190 },
  { lat: 31.5446, lng: 74.4195 },
  { lat: 31.5450, lng: 74.4200 },
  { lat: 31.5454, lng: 74.4205 },
  { lat: 31.5458, lng: 74.4210 },
  { lat: 31.5462, lng: 74.4215 },
  { lat: 31.5466, lng: 74.4220 },
  { lat: 31.5470, lng: 74.4225 },
  { lat: 31.5474, lng: 74.4230 },
];

const CurrentSession = () => {
  const { userData, userStats, isLoading } = useUser();

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
          zoom={15}  // Increased zoom level for better visibility
        >
          <Marker position={center} />

          {/* Polyline Path */}
          <Polyline
            path={routePath}
            options={{
              strokeColor: "#FF0000",  // Red color for the route
              strokeOpacity: 1.0,
              strokeWeight: 4,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CurrentSession;
