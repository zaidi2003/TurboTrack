import React from "react";

const TimeSlots = ({ slots, selectedSlotId, onSlotSelect }) => {
  // Style definitions
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      width: "100%",
    },
    slotsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 32,
      width: "100%",
      justifyContent: "flex-start",
    },
    slotCard: {
      padding: "12px 16px",
      borderRadius: 10,
      background: "rgba(255, 255, 255, 0.05)",
      color: "#f7f4f1",
      fontFamily: "Readex Pro, sans-serif",
      fontSize: 14,
      cursor: "pointer",
      border: "2px solid transparent",
      outline: "none",
      transition: "all 0.2s ease",
      // Make each slot take less space to fit more per row
      minWidth: "140px", 
      textAlign: "center",
    },
    booked: {
      background: "rgba(123, 3, 3, 0.5)",
      opacity: 0.5,
      cursor: "not-allowed",
    },
    selected: {
      border: "2px solid #a81129",
      boxShadow: "0 0 0 1px #a81129",
    },
    noSlots: {
      color: "#c9c0c0",
      fontFamily: "Readex Pro, sans-serif",
      fontSize: 16,
      fontStyle: "italic",
      padding: "20px 0",
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  if (!slots || slots.length === 0) {
    return (
      <div style={styles.noSlots}>
        No available slots for this date. Please select another date.
      </div>
    );
  }

  // Sort slots chronologically
  const sortedSlots = [...slots].sort((a, b) => {
    return new Date(a.startTime) - new Date(b.startTime);
  });

  return (
    <div style={styles.container}>
      <h3 style={{
        color: "#f7f4f1",
        fontFamily: "Readex Pro, sans-serif",
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 16
      }}>
        Select a Time Slot
      </h3>
      
      <div style={styles.slotsContainer}>
        {sortedSlots.map(slot => {
          const isSelected = slot.id === selectedSlotId;
          const dynamicStyle = {
            ...styles.slotCard,
            ...(slot.booked ? styles.booked : {}),
            ...(isSelected ? styles.selected : {})
          };
          
          return (
            <div 
              key={slot.id} 
              style={dynamicStyle}
              onClick={() => !slot.booked && onSlotSelect(slot.id)}
            >
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;