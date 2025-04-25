import React from "react";
import "./TrackCard.css";

const TrackCard = ({ name, buttonText = "Book", onButtonClick }) => {
  const isDisabled = buttonText === "Select a slot";

  return (
    <div className="track-item">
      <div className="track-name">{name}</div>
      <button
        className={`book-button ${isDisabled ? 'disabled-button' : ''}`}
        onClick={!isDisabled ? onButtonClick : undefined}
        style={{
          cursor: isDisabled ? "not-allowed" : "pointer",
          background: isDisabled ? '#4a4a4a' : undefined,
          color: isDisabled ? '#a0a0a0' : '#f7f4f1',
          border: isDisabled ? '1px solid #6a6a6a' : undefined
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TrackCard;