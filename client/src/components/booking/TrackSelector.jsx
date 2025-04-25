import React, { useState } from "react";

const TrackSelector = ({ tracks, selectedTrackId, onTrackSelect }) => {
  // Get the index of the selected track, or 0 if nothing is selected
  const currentTrackIndex = selectedTrackId 
    ? tracks.findIndex(track => track.id === selectedTrackId) 
    : 0;
  
  // Navigation handling
  const goToPrevTrack = () => {
    const prevIndex = Math.max(0, currentTrackIndex - 1);
    onTrackSelect(tracks[prevIndex].id);
  };
  
  const goToNextTrack = () => {
    const nextIndex = Math.min(tracks.length - 1, currentTrackIndex + 1);
    onTrackSelect(tracks[nextIndex].id);
  };

  // Style definitions
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 32,
    },
    heading: {
      color: "#f7f4f1",
      fontFamily: "Readex Pro, sans-serif",
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 16
    },
    carouselContainer: {
      display: "flex",
      alignItems: "center",
      gap: 16,
    },
    navButton: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.1)",
      border: "none",
      color: "#f7f4f1",
      fontSize: 18,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
    },
    navButtonDisabled: {
      opacity: 0.3,
      cursor: "not-allowed",
    },
    trackCard: {
      flex: 1,
      padding: "16px 20px",
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.05)",
      color: "#f7f4f1",
      fontFamily: "Readex Pro, sans-serif",
      border: "2px solid transparent",
      outline: "none",
      transition: "all 0.2s ease",
    },
    trackName: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 8
    },
    trackInfo: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 14,
      color: "#c9c0c0",
      marginTop: 12
    },
    infoItem: {
      display: "flex",
      alignItems: "center",
      gap: 6
    },
    selected: {
      border: "2px solid #a81129",
      boxShadow: "0 0 0 1px #a81129",
      background: "rgba(168, 17, 41, 0.1)",
    },
    indicator: {
      display: "flex",
      justifyContent: "center",
      gap: 8,
      marginTop: 16
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.3)",
      transition: "all 0.2s ease",
    },
    activeDot: {
      background: "#a81129",
      transform: "scale(1.2)",
    }
  };

  if (!tracks || tracks.length === 0) {
    return (
      <div style={{
        color: "#c9c0c0",
        fontFamily: "Readex Pro, sans-serif",
        fontSize: 16,
        fontStyle: "italic",
        padding: "20px 0",
      }}>
        No tracks available.
      </div>
    );
  }

  // Get the current track to display
  const currentTrack = tracks[currentTrackIndex];
  
  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>
        Select a Track
      </h3>
      
      <div style={styles.carouselContainer}>
        {/* Previous button */}
        <button 
          style={{
            ...styles.navButton,
            ...(currentTrackIndex === 0 ? styles.navButtonDisabled : {})
          }}
          onClick={goToPrevTrack}
          disabled={currentTrackIndex === 0}
        >
          ←
        </button>
        
        {/* Current track */}
        <div 
          style={{
            ...styles.trackCard,
            ...(selectedTrackId === currentTrack.id ? styles.selected : {})
          }}
          onClick={() => onTrackSelect(currentTrack.id)}
        >
          <div style={styles.trackName}>{currentTrack.name}</div>
          <div style={{ fontSize: 14 }}>{currentTrack.description}</div>
          
          <div style={styles.trackInfo}>
            <div style={styles.infoItem}>
              <span>Length:</span>
              <span>{currentTrack.length}</span>
            </div>
            
            <div style={styles.infoItem}>
              <span>Price:</span>
              <span>PKR {currentTrack.price}</span>
            </div>
            
            <div style={styles.infoItem}>
              <span>Age:</span>
              <span>{currentTrack.ageLimit}+</span>
            </div>
          </div>
        </div>
        
        {/* Next button */}
        <button 
          style={{
            ...styles.navButton,
            ...(currentTrackIndex === tracks.length - 1 ? styles.navButtonDisabled : {})
          }}
          onClick={goToNextTrack}
          disabled={currentTrackIndex === tracks.length - 1}
        >
          →
        </button>
      </div>
      
      {/* Track indicator dots */}
      <div style={styles.indicator}>
        {tracks.map((track, index) => (
          <div 
            key={track.id}
            style={{
              ...styles.dot,
              ...(index === currentTrackIndex ? styles.activeDot : {})
            }}
            onClick={() => onTrackSelect(track.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackSelector;