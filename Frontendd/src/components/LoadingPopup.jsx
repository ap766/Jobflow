import React from 'react';
import './LoadingPopup.css'; // Import your CSS file for styling

const LoadingPopup = () => {
  return (
    <div className="loading-popup">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingPopup;
