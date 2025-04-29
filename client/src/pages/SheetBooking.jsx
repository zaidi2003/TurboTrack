import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { SideNavBar, UserProfile } from "../components";
import { DatePicker, TimeSlots, LoadingSpinner, TrackSelector } from "../components/booking";
import axios from "axios";

let MOCK_TRACKS = [
  
  {
    id: "track-1",
    name: "Track 1: Novice",
    length: "3.337 km",
    price: 1500,
    ageLimit: 7,
    description: "Shorter track for younger children or inexperienced drivers",
    track_id: "track-1"
  },
  {
    id: "track-2",
    name: "Track 2: Intermediate",
    length: "20.832 km",
    price: 3000,
    ageLimit: 16,
    description: "Just for fun",
    track_id: "track-1"
  },
  {
    id: "track-3",
    name: "Track 3: Difficult",
    length: "5.891 km",
    price: 5000,
    ageLimit: 18,
    description: "Our most challenging circuit - for the most serious karters only!",
    track_id: "track-1"
  }
];



const mockAPI = {
  getTracks: () => {
    return new Promise((resolve) => {
      resolve(MOCK_TRACKS);
    });
  },
  
  getTrack: (trackId) => {
    return new Promise((resolve, reject) => {
      const track = MOCK_TRACKS.find(t => t.id === trackId);
      if (track) {
        resolve(track);
      } else {
        reject(new Error("Track not found"));
      }
    });
  },
  
  getAvailableDates: (trackId) => {
    return new Promise((resolve) => {
      const dates = [];
      const today = new Date();
      
      for (let i = 1; i < 15; i++) {
        if (i % 2 === 0) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          dates.push(date.toISOString().split('T')[0]);
        }
      }
      
      resolve({ dates });
    });
  },
  
  getAvailableSlots: (trackId, date) => {
    return new Promise((resolve) => {
      const slots = [];
      const startHour = 9;
      const endHour = 24;
      
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
          const startTime = new Date(date);
          startTime.setHours(hour, minutes, 0, 0);
          
          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + 30);
          
          const booked = Math.random() > 0.7;
          
          slots.push({
            id: `slot-${hour}-${minutes}`,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            booked
          });
        }
      }
      
      resolve({ slots });
    });
  },
  
  reserveSlot: (trackId, slotId, date) => {
    return new Promise((resolve) => {
      resolve({ success: true });
    });
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
      marginBottom: 32,
      marginTop: 40,
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
          cursor: "pointer",
        }}
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

const SheetBooking = () => {
  const trackId = null;
  const { trackName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [tracks, setTracks] = useState([]);
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [track, setTrack] = useState(null);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  
  const [availableDates, setAvailableDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading tracks...");

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoadingMessage("Loading tracks...");
        setIsLoading(true);

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tracks/${trackName}`);

        MOCK_TRACKS[0]['name'] = response.data.subtracks[0].subtrackName;
        MOCK_TRACKS[1]['name'] = response.data.subtracks[1].subtrackName;
        MOCK_TRACKS[2]['name'] = response.data.subtracks[2].subtrackName;

        MOCK_TRACKS[0]['cost'] = response.data.subtracks[0].cost;
        MOCK_TRACKS[1]['cost'] = response.data.subtracks[1].cost;
        MOCK_TRACKS[2]['cost'] = response.data.subtracks[2].cost;

        MOCK_TRACKS[0]['length'] = response.data.subtracks[0].length;
        MOCK_TRACKS[1]['length'] = response.data.subtracks[1].length;
        MOCK_TRACKS[2]['length'] = response.data.subtracks[2].length;

        MOCK_TRACKS[0]['id'] = response.data.subtracks[0]._id;
        MOCK_TRACKS[1]['id'] = response.data.subtracks[1]._id;
        MOCK_TRACKS[2]['id'] = response.data.subtracks[2]._id;

        MOCK_TRACKS[0]['track_id'] = response.data._id;
        MOCK_TRACKS[1]['track_id'] = response.data._id;
        MOCK_TRACKS[2]['track_id'] = response.data._id;


        const temptrackID = response.data._id;
        const fetchedTracks = await mockAPI.getTracks();
        setTracks(fetchedTracks);
        
        if (trackId) {
          setSelectedTrackId(trackId);
        } else if (fetchedTracks.length > 0) {
          setSelectedTrackId(fetchedTracks[0].id);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        toast.error("Failed to load tracks");
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [trackId]);

  useEffect(() => {
    const fetchTrackData = async () => {
      if (!selectedTrackId) {
        setTrack(null);
        return;
      }
      
      try {
        setLoadingMessage("Loading track information...");
        setIsLoading(true);
        
        const fetchedTrack = await mockAPI.getTrack(selectedTrackId);
        setTrack(fetchedTrack);
        
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
  }, [selectedTrackId]);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      if (!track) return;
      
      try {
        setLoadingMessage("Loading available dates...");
        setIsLoading(true);
        
        const response = await mockAPI.getAvailableDates(track.id);
        setAvailableDates(response.dates || []);
        
        if (response.dates && response.dates.length > 0) {
          setSelectedDate(response.dates[0]);
        }
      } catch (error) {
        console.error("Error fetching available dates:", error);
        toast.error("Failed to load available dates");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableDates();
  }, [track]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!track || !selectedDate) return;
      
      try {
        setLoadingMessage("Loading time slots...");
        setIsLoading(true);
        
        const response = await mockAPI.getAvailableSlots(track.id, selectedDate);
        setSlots(response.slots || []);
        
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
  }, [track, selectedDate]);

  const handleProceedToPayment = async () => {
    if (!selectedSlotId) {
      toast.warning("Please select a time slot");
      return;
    }
    
    try {
      setLoadingMessage("Reserving your slot...");
      setIsLoading(true);
      
      await mockAPI.reserveSlot(track.id, selectedSlotId, selectedDate);
      
      setIsLoading(false);
      
      setTimeout(() => {
        navigate(`/bookings/sheet/${encodeURIComponent(track.name)}/checkout`, {
          state: { 
            track, 
            slotId: selectedSlotId,
            date: selectedDate,
            slot: slots.find(slot => slot.id === selectedSlotId)
          } 
        });
      }, 10);
      
    } catch (error) {
      console.error("Error reserving slot:", error);
      toast.error("Failed to reserve slot. Please try again.");
      setIsLoading(false);
    }
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
          name={track.name}
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