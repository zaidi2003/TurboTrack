import React from "react";
import { TrackCard, LoadingSpinner } from ".";

const DiscoverTab = ({ tracks, onBookTrack, isLoading }) => {
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
  
  if (tracks.length === 0) {
    return (
      <div style={{
        background: "rgba(20, 20, 20, 0.5)",
        borderRadius: 15,
        border: "1px solid #3d3d3d",
        padding: "40px",
        marginTop: "20px",
        color: "#c0c0c0",
        fontFamily: "Readex Pro, sans-serif",
        fontSize: 16,
        textAlign: "center"
      }}>
        No tracks available at the moment. Please check back later.
      </div>
    );
  }
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          name={track.name}
          buttonText="Book"
          onButtonClick={() => onBookTrack(track)}
        />
      ))}
    </div>
  );
};

export default DiscoverTab;