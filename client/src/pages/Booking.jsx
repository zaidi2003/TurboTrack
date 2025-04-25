import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SideNavBar, UserProfile } from "../components";
import { TabBar } from "../components/booking";
import { toast } from "react-toastify";
import axios from 'axios';



const Booking = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [activeTab, setActiveTab] = useState("discover");
  const navigate = useNavigate();
  const location = useLocation();

  const tracks = [
    {
      id: 1,
      name: "Kool Karterz",
      slots: [
        { id: 1, time: "12:00 PM", booked: true },
        { id: 2, time: "12:30 PM", booked: false },
        { id: 3, time: "1:00 PM", booked: false },
      ],
    },
    {
      id: 2,
      name: "Kartz 4 Karterz",
      slots: [
        { id: 4, time: "12:00 PM", booked: false },
        { id: 5, time: "12:30 PM", booked: true },
        { id: 6, time: "1:00 PM", booked: false },
      ],
    },
    {
      id: 3,
      name: "Karting Karterz",
      slots: [
        { id: 7, time: "2:00 PM", booked: true },
        { id: 8, time: "2:30 PM", booked: false },
        { id: 9, time: "3:00 PM", booked: false },
      ],
    },
  ];

  const [currentBookings, setCurrentBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [newBookingDetails, setNewBookingDetails] = useState(null);
  
  useEffect(() => {
    if (activeTab === "current" && currentBookings.length === 0) {
      setCurrentBookings([]);
    }
  }, [currentBookings, activeTab]);

  useEffect(() => {
    if (location.state?.paymentSuccess && location.state?.bookingDetails) {
      const newBooking = location.state.bookingDetails;
      setNewBookingDetails(newBooking);
      
      setCurrentBookings(prev => [...prev, newBooking]);
      
      setShowPaymentSuccessModal(true);
      
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  // useEffect(() => {

  //   if (currentBookings.length === 0) {
  //     setCurrentBookings([
  //       {
  //         id: "book-101",
  //         trackName: "Kartz 4 Karterz",
  //         date: new Date().toISOString(),
  //         time: "2:30 PM - 3:00 PM",
  //         price: 3000,
  //       },
  //     ]);
  //   }
  // }, [currentBookings.length]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (currentBookings.length === 0) {
        // Fetch user bookings from the API
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/booking/get-user-bookings`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const fetchedBookings = response.data.bookings || [];
          
          if (fetchedBookings.length === 0) {
            // Fallback to default if no bookings
            setCurrentBookings([
              {
                id: "book-101",
                trackName: "Kartz 4 Karterz",
                date: new Date().toISOString(),
                time: "2:30 PM - 3:00 PM",
                price: 3000,
              },
            ]);
          } else {
            setCurrentBookings(fetchedBookings);
          }
        } catch (error) {
          console.error("Error fetching user bookings:", error);
        }
      }
    };
  
    fetchBookings();
  }, [token, currentBookings.length]);
  

  useEffect(() => {
    if (bookingHistory.length === 0) {
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
  }, [bookingHistory.length]);


 
  
  const handleCancelBooking = (booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
  };
  
  const confirmCancelBooking = () => {
    if (bookingToCancel) {
      const idToCancel = bookingToCancel.id;
      
      const updatedBookings = currentBookings.filter(booking => booking.id !== idToCancel);
      setCurrentBookings(updatedBookings);
      
      toast.info("Booking cancelled successfully");
      
      setShowCancelModal(false);
      setBookingToCancel(null);
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

  const BookingCard = ({ booking, showCancelButton }) => {
    return (
      <div
        style={{
          background: "rgba(20, 20, 20, 0.7)",
          borderRadius: 15,
          border: "1px solid #3d3d3d",
          padding: "30px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              color: "#ff7575",
              fontFamily: "Readex Pro, sans-serif",
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            {booking.track}
          </div>
          <div
            style={{
              color: "#c0c0c0",
              fontFamily: "Readex Pro, sans-serif",
              fontSize: 14,
            }}
          >
            {formatDate(booking.date)} • {booking.timeSlot}
          </div>
          <div
            style={{
              color: "#f7f4f1",
              fontFamily: "Readex Pro, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 5,
            }}
          >
            PKR {booking.price}
          </div>
        </div>

        {showCancelButton && (
          <button
            style={{
              background: "linear-gradient(90deg, #300101 6%, #7b0303 50%, #960404 95%)",
              border: "none",
              borderRadius: 8,
              padding: "10px 30px",
              color: "#f7f4f1",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              minWidth: 100,
            }}
            onClick={() => handleCancelBooking(booking)}
          >
            Cancel
          </button>
        )}
      </div>
    );
  };

  const EmptyState = ({ message }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(20, 20, 20, 0.5)",
        borderRadius: 15,
        border: "1px solid #3d3d3d",
        padding: "40px",
        marginTop: "20px",
        color: "#c0c0c0",
        fontFamily: "Readex Pro, sans-serif",
        fontSize: 16,
      }}
    >
      {message}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "discover":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {tracks.map((track) => (
              <TrackCard
                key={track.id}
                name={track.name}
                onButtonClick={() =>
                  navigate(`/bookings/sheet/${encodeURIComponent(track.name)}`, {
                    state: { track },
                  })
                }
              />
            ))}
          </div>
        );
      case "current":
        return (
          <div>
            {currentBookings.length > 0 ? (
              currentBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  showCancelButton={true}
                />
              ))
            ) : (
              <EmptyState message="You have no current bookings." />
            )}
          </div>
        );
      case "history":
        return (
          <div>
            {bookingHistory.length > 0 ? (
              bookingHistory.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  showCancelButton={false}
                />
              ))
            ) : (
              <EmptyState message="You have no booking history." />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const TrackCard = ({ name, onButtonClick }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 16,
          padding: "16px 24px",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            color: "#f7f4f1",
            fontFamily: "Readex Pro, sans-serif",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
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
          Book
        </button>
      </div>
    );
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
          `Are you sure you want to cancel your booking for ${bookingToCancel.trackName} on ${formatDate(bookingToCancel.date)} at ${bookingToCancel.time}?` : 
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