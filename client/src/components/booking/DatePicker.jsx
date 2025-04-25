import React, { useState } from "react";

const DatePicker = ({ selectedDate, onDateChange, availableDates }) => {

  const getDates = () => {
    const allDates = [];
    const today = new Date();
    

    for (let i = 0; i < 21; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      

      const isAvailable = !availableDates || availableDates.some(
        availDate => new Date(availDate).toDateString() === date.toDateString()
      );
      

      const weekIndex = Math.floor(i / 7);
      
      allDates.push({
        date,
        dateString: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isAvailable,
        weekIndex
      });
    }
    return allDates;
  };

  const dates = getDates();


  const datesByWeek = dates.reduce((acc, date) => {
    if (!acc[date.weekIndex]) {
      acc[date.weekIndex] = [];
    }
    acc[date.weekIndex].push(date);
    return acc;
  }, {});


  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  

  const formatWeekRange = (weekDates) => {
    if (!weekDates || weekDates.length === 0) return "";
    
    const firstDate = new Date(weekDates[0].date);
    const lastDate = new Date(weekDates[weekDates.length - 1].date);
    
    const formatOptions = { month: 'short', day: 'numeric' };
    return `${firstDate.toLocaleDateString('en-US', formatOptions)} - ${lastDate.toLocaleDateString('en-US', formatOptions)}`;
  };

  return (
    <div className="date-picker">
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }}>
        <h3 style={{
          color: "#f7f4f1",
          fontFamily: "Readex Pro, sans-serif",
          fontSize: 18,
          fontWeight: 600,
        }}>
          Select a Date
        </h3>
        
        <div style={{
          display: "flex",
          gap: 12,
        }}>
          <button 
            onClick={() => setCurrentWeekIndex(idx => Math.max(0, idx - 1))}
            disabled={currentWeekIndex === 0}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "#f7f4f1",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: currentWeekIndex === 0 ? "not-allowed" : "pointer",
              opacity: currentWeekIndex === 0 ? 0.5 : 1,
            }}
          >
            Previous Week
          </button>
          <button 
            onClick={() => setCurrentWeekIndex(idx => Math.min(2, idx + 1))}
            disabled={currentWeekIndex === 2}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "#f7f4f1",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: currentWeekIndex === 2 ? "not-allowed" : "pointer",
              opacity: currentWeekIndex === 2 ? 0.5 : 1,
            }}
          >
            Next Week
          </button>
        </div>
      </div>
      
      <div style={{
        color: "#c9c0c0",
        fontFamily: "Readex Pro, sans-serif",
        fontSize: 14,
        marginBottom: 12,
      }}>
        {formatWeekRange(datesByWeek[currentWeekIndex])}
      </div>
      
      <div style={{
        display: "flex",
        gap: 12,
        marginBottom: 32
      }}>
        {datesByWeek[currentWeekIndex]?.map((date) => (
          <div
            key={date.dateString}
            onClick={() => date.isAvailable && onDateChange(date.dateString)}
            style={{
              width: 70,
              height: 80,
              borderRadius: 12,
              background: date.dateString === selectedDate 
                ? "linear-gradient(90deg, #300101 6%, #7b0303 50%, #960404 95%)"
                : "rgba(255, 255, 255, 0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: date.isAvailable ? "pointer" : "not-allowed",
              opacity: date.isAvailable ? 1 : 0.4,
              transition: "all 0.2s ease",
              border: date.dateString === selectedDate ? "2px solid #a81129" : "2px solid transparent"
            }}
          >
            <div style={{
              color: "#f7f4f1",
              fontSize: 14,
              fontWeight: 500,
            }}>
              {date.dayName}
            </div>
            <div style={{
              color: "#f7f4f1",
              fontSize: 18,
              fontWeight: 700,
              marginTop: 4
            }}>
              {date.dayNumber}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;