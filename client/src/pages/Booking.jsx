import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SideNavBar, UserProfile } from "../components";
import { TabBar, TrackCard, LoadingSpinner, DiscoverTab , CurrentBookingsTab, BookingHistoryTab} from "../components/booking";
import { toast } from "react-toastify";
import axios from 'axios';
import { useUser } from "../context/UserContext";


const Booking = () => {
  const { token, userData } = useUser();
  const [activeTab, setActiveTab] = useState("discover");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [currentBookings, setCurrentBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [tracks, setTracks] = useState([]);
  
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [newBookingDetails, setNewBookingDetails] = useState(null);
  
  // Fetch tracks from API
  const fetchTracks = async () => {
    setIsLoading(true);
    try {
      // Replace with actual API call when backend is ready
      // const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/booking/tracks`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // setTracks(response.data.tracks || []);

      // Mock data until backend is ready
      
    } catch (error) {
      toast.error("Failed to fetch available tracks");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user bookings from API
  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/booking/get-user-bookings`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const fetchedBookings = response.data.bookings || [];
      console.log("Fetched bookings:", fetchedBookings);  
      if (fetchedBookings.length === 0) {
        // Fallback to default if no bookings
        
      } else {
        // Process bookings - separate current from historical
        const now = new Date();
        const current = [];
        const history = [];
        
        fetchedBookings.forEach(booking => {
          const bookingDate = new Date(booking.date);
          
          if(booking.status === "pending") {
            current.push(booking);
          } else {

            history.push(booking);
          }
        });
        
        setCurrentBookings(current);
        setBookingHistory(history);
      }
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      
      
      
      setBookingHistory([
        {
          id: "book-099",
          trackName: "Kool Karterz",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          time: "1:00 PM - 1:30 PM",
          price: 1500,
        },
        {
          id: "book-098",
          trackName: "Karting Karterz",
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          time: "11:00 AM - 11:30 AM",
          price: 5000,
        },
      ]);
    }
  };

  // Load initial data
    useEffect(() => {
    fetchTracks();
    fetchUserBookings();
  }, [token]);

  // Handle payment success from redirect
  useEffect(() => {
    if (location.state?.paymentSuccess && location.state?.bookingDetails) {
      const newBooking = location.state.bookingDetails;
      setNewBookingDetails(newBooking);
      
      setCurrentBookings(prev => [...prev, newBooking]);
      
      setShowPaymentSuccessModal(true);
      
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  const handleCancelBooking = (booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
  };
  
  const confirmCancelBooking = async () => {
    if (bookingToCancel) {
      setIsLoading(true);
      try {
        console.log("Cancelling booking:", bookingToCancel);

        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/booking/cancel`,
          {
            bookingId: bookingToCancel._id, // or bookingToCancel.id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // if your backend uses auth
            },
          }
        );
        const updatedBookings = currentBookings.filter(
          booking => booking.id !== bookingToCancel.id
        );
        setCurrentBookings(updatedBookings);
        
        toast.success("Booking cancelled successfully");
      } catch (error) {
        toast.error("Failed to cancel booking");
        console.error(error);
      } finally {
        setIsLoading(false);
        setShowCancelModal(false);
        setBookingToCancel(null);
      }
    }
  };

  

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const Modal = ({ show, title, message, onConfirm, onCancel, confirmText, cancelText }) => {
    if (!show) return null;
    
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100
      }}>
        <div style={{
          background: "rgba(30, 30, 30, 0.9)",
          borderRadius: 15,
          border: "1px solid #3d3d3d",
          padding: "30px",
          width: "400px",
          maxWidth: "90%"
        }}>
          <div style={{
            color: "#f7f4f1",
            fontFamily: "Readex Pro, sans-serif",
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 20
          }}>
            {title}
          </div>
          <div style={{
            color: "#c0c0c0",
            fontFamily: "Readex Pro, sans-serif",
            fontSize: 16,
            marginBottom: 30
          }}>
            {message}
          </div>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 15
          }}>
            {cancelText && (
              <button
                style={{
                  background: "transparent",
                  border: "1px solid #787878",
                  borderRadius: 8,
                  padding: "8px 20px",
                  color: "#c0c0c0",
                  fontSize: 14,
                  cursor: "pointer"
                }}
                onClick={onCancel}
              >
                {cancelText}
              </button>
            )}
            <button
              style={{
                background: "linear-gradient(90deg, #300101 6%, #7b0303 50%, #960404 95%)",
                border: "none",
                borderRadius: 8,
                padding: "8px 20px",
                color: "#f7f4f1",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer"
              }}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render the appropriate tab content
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          marginTop: 50 
        }}>
          <LoadingSpinner size={50} />
        </div>
      );
    }

    switch (activeTab) {
      case "discover":
        return (
          <DiscoverTab 
            tracks={tracks} 
            onBookTrack={(track) => navigate(`/bookings/sheet/${encodeURIComponent(track.name)}`, {
              state: { track },
            })}
          />
        );
      case "current":
        return (
          <CurrentBookingsTab 
            bookings={currentBookings}
            onCancelBooking={handleCancelBooking}
            formatDate={formatDate}
          />
        );
      case "history":
        return (
          <BookingHistoryTab 
            bookings={bookingHistory}
            formatDate={formatDate}
          />
        );
      default:
        return null;
    }
  };

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
          top: 52,
          left: "50%",
          transform: "translateX(-50%)",
          width: 656,
          height: 56,
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: 28,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 5,
        }}
      >
        <input
          type="text"
          placeholder="Search for tracks"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#f7f4f1",
            fontSize: 16,
            fontFamily: "Readex Pro",
            width: "100%",
            height: "100%",
          }}
        />
        <div
          style={{
            width: 24,
            height: 24,
            opacity: 0.6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          🔍
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 363,
          top: 150,
          width: "calc(100% - 400px)",
          maxWidth: "1200px",
          zIndex: 5,
        }}
      >
        <TabBar
          tabs={["discover", "current", "history"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 30 }}>
          <div
            style={{
              color: "#c9c0c0",
              width: 90,
              height: 20,
              fontSize: 14,
              fontFamily: "Readex Pro",
              fontWeight: 700,
              borderBottom: "2px solid #787878",
              paddingBottom: 5,
            }}
          >
            {activeTab === "discover"
              ? "ALL TRACKS"
              : activeTab === "current"
              ? "UPCOMING"
              : "PAST"}
          </div>
        </div>

        {renderTabContent()}
      </div>
      
      <Modal
        show={showPaymentSuccessModal}
        title="Payment Confirmed!"
        message={newBookingDetails ? 
          `Your booking for ${newBookingDetails.trackName} on ${formatDate(newBookingDetails.date)} at ${newBookingDetails.time} has been confirmed.` : 
          "Your booking has been confirmed."}
        onConfirm={() => {
          setShowPaymentSuccessModal(false);
          setNewBookingDetails(null);
          setActiveTab("current");
        }}
        confirmText="OK"
      />
      
      <Modal
        show={showCancelModal}
        title="Cancel Booking"
        message={bookingToCancel ? 
          `Are you sure you want to cancel your booking for ${bookingToCancel.trackName} on ${formatDate(bookingToCancel.date)} at ${bookingToCancel.timeSlot}?` : 
          "Are you sure you want to cancel this booking?"}
        onConfirm={confirmCancelBooking}
        onCancel={() => {
          setShowCancelModal(false);
          setBookingToCancel(null);
        }}
        confirmText="Yes, Cancel"
        cancelText="No, Keep Booking"
      />
    </div>
  );
};

export default Booking;