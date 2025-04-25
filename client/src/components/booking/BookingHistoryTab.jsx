import React from "react";
import { LoadingSpinner } from ".";

const BookingHistoryTab = ({ bookings, formatDate, isLoading }) => {
  const BookingCard = ({ booking }) => {
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
            {booking.trackName}
          </div>
          <div
            style={{
              color: "#c0c0c0",
              fontFamily: "Readex Pro, sans-serif",
              fontSize: 14,
            }}
          >
            {formatDate(booking.date)} • {booking.time}
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

        {/* Status indicator for past bookings */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: 8,
            padding: "6px 16px",
            color: "#c0c0c0",
            fontSize: 14,
            fontFamily: "Readex Pro, sans-serif",
          }}
        >
          Completed
        </div>
      </div>
    );
  };

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

  if (!bookings || bookings.length === 0) {
    return (
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
        You have no booking history.
      </div>
    );
  }

  return (
    <div>
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingHistoryTab;