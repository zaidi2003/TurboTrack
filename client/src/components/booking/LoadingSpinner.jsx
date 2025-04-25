import React from 'react';

const LoadingSpinner = ({ size = 40, color = "#a81129" }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        border: `4px solid rgba(255, 255, 255, 0.1)`,
        borderLeftColor: color,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    >
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;