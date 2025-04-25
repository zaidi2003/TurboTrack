import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { SideNavBar, UserProfile } from "../components";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const { trackName } = useParams();
  const decodedTrackName = decodeURIComponent(trackName);
  const { token, userData } = useUser();

  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [trackData, setTrackData] = useState(null);
  const [error, setError] = useState(null);
  
  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("");

  // Extract track, date, slot from location state (passed from previous page)
  const { track, date, slot } = location.state || {};

  // If track wasn't passed in location state, fetch it from API
  useEffect(() => {
    const fetchTrackData = async () => {
      // Skip API call if we already have track data from location state
      if (track) {
        setTrackData(track);
        return;
      }
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/tracks/name/${encodeURIComponent(decodedTrackName)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTrackData(response.data);
      } catch (err) {
        console.error("Error fetching track data:", err);
        setError("Failed to load track information");
        toast.error("Failed to load track information");
      }
    };

    fetchTrackData();
  }, [track, decodedTrackName, token]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // First authenticate the payment
      const paymentData = {
        transactionId: `txn-${Date.now()}`,
        amount: 3500, // Fixed amount based on your payment.js validation
        userId: userData?.id,
        cardNumber: cardNumber.replace(/\s/g, ""), // Remove spaces
        cvc,
        expirationDate
      };

      const paymentResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/payment/authenticate`,
        paymentData
      );

      if (paymentResponse.data.status === "success") {
        // Create booking payload
        const bookingPayload = {
          track: trackData?.trackName || decodedTrackName,
          date,
          timeSlot: slot?.time || "12:00", // Using the time format from your schema
          email: userData?.email,
          status: "pending"
        };

        // Create the booking
        const bookingResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/booking/create`,
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setIsProcessing(false);
        
        // Navigate to bookings page with success info
        navigate("/bookings", {
          state: {
            paymentSuccess: true,
            bookingDetails: bookingResponse.data
          },
        });
      } else {
        throw new Error("Payment failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setIsProcessing(false);
      toast.error(err.response?.data?.msg || "Payment processing failed");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "982px",
        position: "relative",
        background:
          "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
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
          top: 50,
          width: "calc(100% - 400px)",
          maxWidth: "1200px",
          zIndex: 5,
        }}
      >
        {error ? (
          <div style={{ 
            background: "rgba(255, 0, 0, 0.2)", 
            padding: "20px", 
            borderRadius: "10px",
            color: "#f7f4f1",
            marginBottom: "20px"
          }}>
            {error}
          </div>
        ) : (
          <>
            <div
              style={{
                background: "rgba(30, 30, 30, 0.7)",
                borderRadius: 15,
                border: "1px solid #3d3d3d",
                padding: "30px",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 10,
                    opacity: 0.8,
                  }}
                >
                  💳
                </div>
                <div
                  style={{
                    color: "#f7f4f1",
                    fontFamily: "Readex Pro, sans-serif",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  PAYMENT
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      color: "#f7f4f1",
                      fontFamily: "Readex Pro, sans-serif",
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    style={{
                      width: "100%",
                      height: 45,
                      background: "rgba(240, 240, 240, 0.1)",
                      border: "none",
                      borderRadius: 8,
                      padding: "0 15px",
                      color: "#f7f4f1",
                      fontSize: 16,
                    }}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    marginBottom: 20,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        color: "#f7f4f1",
                        fontFamily: "Readex Pro, sans-serif",
                        fontSize: 14,
                        marginBottom: 8,
                      }}
                    >
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      style={{
                        width: "100%",
                        height: 45,
                        background: "rgba(240, 240, 240, 0.1)",
                        border: "none",
                        borderRadius: 8,
                        padding: "0 15px",
                        color: "#f7f4f1",
                        fontSize: 16,
                      }}
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        color: "#f7f4f1",
                        fontFamily: "Readex Pro, sans-serif",
                        fontSize: 14,
                        marginBottom: 8,
                      }}
                    >
                      Security Code
                    </label>
                    <input
                      type="text"
                      placeholder="CVV"
                      style={{
                        width: "100%",
                        height: 45,
                        background: "rgba(240, 240, 240, 0.1)",
                        border: "none",
                        borderRadius: 8,
                        padding: "0 15px",
                        color: "#f7f4f1",
                        fontSize: 16,
                      }}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      color: "#f7f4f1",
                      fontFamily: "Readex Pro, sans-serif",
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    Country
                  </label>
                  <select
                    style={{
                      width: "100%",
                      height: 45,
                      background: "rgba(240, 240, 240, 0.1)",
                      border: "none",
                      borderRadius: 8,
                      padding: "0 15px",
                      color: "#f7f4f1",
                      fontSize: 16,
                      appearance: "none",
                    }}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="PK">Pakistan</option>
                    <option value="IN">India</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </form>
            </div>

            <div
              style={{
                background: "rgba(20, 20, 20, 0.7)",
                borderRadius: 15,
                border: "1px solid #3d3d3d",
                padding: "30px",
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
                  {trackData?.trackName || decodedTrackName}
                </div>
                <div
                  style={{
                    color: "#c0c0c0",
                    fontFamily: "Readex Pro, sans-serif",
                    fontSize: 14,
                  }}
                >
                  {formatDate(date)} • {formatTime(slot?.time)}
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
                  PKR 3500
                </div>
              </div>

              <button
                style={{
                  background:
                    "linear-gradient(90deg, #300101 6%, #7b0303 50%, #960404 95%)",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 30px",
                  color: "#f7f4f1",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: isProcessing ? "wait" : "pointer",
                  minWidth: 100,
                }}
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;