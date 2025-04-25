import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { SideNavBar, UserProfile } from "../components";
import { DatePicker, TimeSlots, LoadingSpinner, TrackSelector } from "../components/booking";
import axios from 'axios';
import { useUser } from "../context/UserContext";

const SheetBooking = () => {
  const { trackId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token, userData } = useUser();
  
  const [tracks, setTracks] = useState([]);
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [track, setTrack] = useState(null);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  
  const [availableDates, setAvailableDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading tracks...");

  // Fetch all available tracks
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoadingMessage("Loading tracks...");
        setIsLoading(true);
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/tracks`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const fetchedTracks = response.data;
        setTracks(fetchedTracks);
        
        // If trackId is in the URL, use it, otherwise select the first track
        if (trackId) {
          setSelectedTrackId(trackId);
        } else if (fetchedTracks.length > 0) {
          setSelectedTrackId(fetchedTracks[0].trackID);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        toast.error("Failed to load tracks");
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [trackId, token]);

  // Fetch selected track details
  useEffect(() => {
    const fetchTrackData = async () => {
      if (!selectedTrackId) {
        setTrack(null);
        return;
      }
      
      try {
        setLoadingMessage("Loading track information...");
        setIsLoading(true);
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/tracks/${selectedTrackId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setTrack(response.data);
        
        // Reset selections
        setSelectedDate(null);
        setSelectedSlotId(null);
        setSlots([]);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching track:", error);
        toast.error("Failed to load track information");
        setSelectedTrackId(null);
        setTrack(null);
        setIsLoading(false);
      }
    };

    fetchTrackData();
  }, [selectedTrackId, token]);

  // Fetch available dates for the selected track
  useEffect(() => {
    const fetchAvailableDates = async () => {
      if (!track) return;
      
      try {
        setLoadingMessage("Loading available dates...");
        setIsLoading(true);
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/tracks/${track.trackID}/available-dates`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setAvailableDates(response.data.dates || []);
        
        if (response.data.dates && response.data.dates.length > 0) {
          setSelectedDate(response.data.dates[0]);
        }
      } catch (error) {
        console.error("Error fetching available dates:", error);
        toast.error("Failed to load available dates");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableDates();
  }, [track, token]);
  
  // Fetch available time slots for the selected date
  useEffect(() => {
    const fetchSlots = async () => {
      if (!track || !selectedDate) return;
      
      try {
        setLoadingMessage("Loading time slots...");
        setIsLoading(true);
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/tracks/${track.trackID}/slots/${selectedDate}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setSlots(response.data.slots || []);
        setSelectedSlotId(null);
      } catch (error) {
        console.error("Error fetching slots:", error);
        toast.error("Failed to load time slots");
        setSlots([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();
  }, [track, selectedDate, token]);
  
  const handleProceedToPayment = async () => {
    if (!selectedSlotId) {
      toast.warning("Please select a time slot");
      return;
    }
    
    try {
      setLoadingMessage("Reserving your slot...");
      setIsLoading(true);
      
      // Reserve the slot temporarily
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/tracks/reserve-slot`,
        {
          trackId: track.trackID,
          slotId: selectedSlotId,
          date: selectedDate
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setIsLoading(false);
      
      // Find the selected slot
      const selectedSlot = slots.find(slot => slot.id === selectedSlotId);
      
      // Navigate to payment page
      navigate(`/bookings/sheet/${encodeURIComponent(track.trackName)}/checkout`, {
        state: { 
          track, 
          date: selectedDate,
          slot: selectedSlot
        } 
      });
      
    } catch (error) {
      console.error("Error reserving slot:", error);
      toast.error("Failed to reserve slot. Please try again.");
      setIsLoading(false);
    }
  };
  
  const TrackCard = ({ name, buttonText, onButtonClick }) => {
    return (
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 16,
        padding: "16px 24px",
        marginBottom: 32
      }}>
        <div style={{
          color: "#f7f4f1",
          fontFamily: "Readex Pro, sans-serif",
          fontSize: 26,
          fontWeight: 700
        }}>
          {name}
        </div>
        <button
          style={{
            background: "linear-gradient(90deg, #300101 6%, #7b0303 50%, #960404 95%)",
            border: "none",
            borderRadius: 15,
            padding: "12px 20px",
            color: "#f7f4f1",
            fontSize: 14,
            fontFamily: "Readex Pro, sans-serif",
            cursor: onButtonClick ? "pointer" : "not-allowed",
            opacity: onButtonClick ? 1 : 0.7
          }}
          onClick={onButtonClick}
          disabled={!onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    );
  };
  
  const styles = {
    wrapper: {
      width: "100%",
      minHeight: "982px",
      position: "relative",
      background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
      overflow: "hidden",
      paddingBottom: "40px",
    },
    content: {
      position: "absolute",
      left: 363,
      top: 150,
      width: "calc(100% - 400px)",
      maxWidth: "1200px",
      zIndex: 5,
    },
    headerArea: {
      position: "absolute",
      left: 363,
      top: 50,
      width: "calc(100% - 400px)",
      maxWidth: "1200px",
      zIndex: 5,
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "400px",
      flexDirection: "column",
      gap: "20px",
      color: "#f7f4f1",
      fontFamily: "Readex Pro, sans-serif",
    }
  };
  
  if (isLoading) {
    return (
      <div style={styles.wrapper}>
        <SideNavBar />
        <UserProfile style={{ position: "absolute", top: 30, right: 40 }} />
        <div style={styles.content}>
          <div style={styles.loadingContainer}>
            <LoadingSpinner />
            <div>{loadingMessage}</div>
          </div>
        </div>
      </div>
    );
  }

  const getHeaderContent = () => {
    if (track) {
      return (
        <TrackCard
          name={track.trackName}
          buttonText={selectedSlotId ? "Proceed to Pay" : "Select a slot"}
          onButtonClick={selectedSlotId ? handleProceedToPayment : null}
        />
      );
    }
    
    return (
      <div style={{
        color: "#f7f4f1",
        fontFamily: "Readex Pro, sans-serif",
        fontSize: 26,
        fontWeight: 700,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 16,
        padding: "16px 24px",
        marginBottom: 32
      }}>
        Track Booking
      </div>
    );
  };

  return (
    <div style={styles.wrapper}>
      <SideNavBar />
      <UserProfile style={{ position: "absolute", top: 30, right: 40 }} />

      <div style={styles.headerArea}>
        {getHeaderContent()}
      </div>

      <div style={styles.content}>
        <TrackSelector 
          tracks={tracks}
          selectedTrackId={selectedTrackId}
          onTrackSelect={setSelectedTrackId}
        />
        
        {track && (
          <DatePicker 
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            availableDates={availableDates}
          />
        )}
        
        {track && selectedDate && (
          <TimeSlots 
            slots={slots}
            selectedSlotId={selectedSlotId}
            onSlotSelect={setSelectedSlotId}
          />
        )}
      </div>
    </div>
  );
};

export default SheetBooking;