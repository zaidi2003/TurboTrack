import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { SideNavBar, UserProfile } from "../components";
import axios from "axios";

const PaymentPage = () => {
  const { trackName } = useParams();
  const decodedTrackName = decodeURIComponent(trackName);

  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const { track, date, slot } = location.state || {};
  
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
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsProcessing(true);

  const bookingPayload = {
    track: "2f2f",
    timeSlot: "12:00",       // must match HH:mm (24-hour format)
    date: "2025-01-01",      // ISO format string; will be cast to Date
    email: "yapping@gmail.com"
  };
  
  try {
    const response = await axios.post("http://localhost:3000/api/v1/booking/create", bookingPayload);

    navigate("/bookings", {
      state: {
        paymentSuccess: true,
        bookingDetails: response.data.booking,
      },
    });
  } catch (error) {
    alert("Booking failed: " + (error.response?.data?.message || error.message));
  } finally {
    setIsProcessing(false);
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
              {track?.name || decodedTrackName || "Track Name"}
            </div>
            <div
              style={{
                color: "#c0c0c0",
                fontFamily: "Readex Pro, sans-serif",
                fontSize: 14,
              }}
            >
              {formatDate(date)} •{" "}
              {slot &&
                `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`}
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
              PKR {track?.price || "3000"}
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
      </div>
    </div>
  );
};

export default PaymentPage;