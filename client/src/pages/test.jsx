import { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, Polygon, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import "../styles/common-components.css";

const containerStyle = {
  width: "100%",
  height: "100vh",  // Ensure the map container takes up full viewport height
};

const center = {
  lat: 31.5409,  
  lng: 74.4149,  
};

const Test = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({});
  const [directions, setDirections] = useState(null);
  const directionsService = useRef(null);

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
    { lat: 31.5500, lng: 74.3500 },  // top-left
    { lat: 31.5500, lng: 74.4200 },  // top-right
    { lat: 31.5300, lng: 74.4200 },  // bottom-right
    { lat: 31.5300, lng: 74.3500 },  // bottom-left
  ];

  useEffect(() => {
    fetchCoordinates();
  }, []); // run only once

  const calculateRoute = () => {
    if (!directionsService.current) return;

    const origin = { lat: 31.5497, lng: 74.3436 };  // Lahore, Pakistan (Approximate center)
    const destination = { lat: 31.582045, lng: 74.329376 }; // Another point in Lahore
    const waypoints = [
      { location: { lat: 31.5582, lng: 74.3587 }, stopover: true },
      { location: { lat: 31.5525, lng: 74.3517 }, stopover: true },
    ];

    directionsService.current.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: "DRIVING",  // You can change this to WALKING, BICYCLING, etc.
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          toast.error("Error fetching route");
        }
      }
    );
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      directionsService.current = new google.maps.DirectionsService();
      calculateRoute();
    }
  }, []); // Run once when map is loaded

  return (
    <LoadScript googleMapsApiKey="AIzaSyCGPPHPMaswMl3qX-x9QRlK4nzUUT2vItY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}  // Adjust zoom level for route visibility
      >
        <Marker position={center} />

        <Polygon
          paths={rectangleCoords}
          options={{
            fillColor: "#FF0000",  // Bright red to ensure visibility
            fillOpacity: 0.4,  // Semi-transparent
            strokeColor: "#FF0000", // Red outline
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#FF0000",
                strokeWeight: 4,
              },
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Test;
