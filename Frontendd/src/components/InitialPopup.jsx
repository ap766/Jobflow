// InitialPopup.js
import React from 'react';
import Popup from "reactjs-popup";
import './InitialPopup.css';

const InitialPopup = ({ isOpen, onClose }) => {
  return (
    <Popup open={isOpen} modal contentStyle={{ background: 'white' }} onClose={onClose}>
      {(close) => (
        <div className="custom-popup">
          <button className="close-btn" onClick={close}>
            X
          </button>
          <div className="popup-content">
            {/* Your popup content here */}
            <div>Create a new board for your job/internship search! 📌</div>
            <div>Or Use your existing boards for your job/internship search. 📋</div>
            <div>All the best! 🚀</div>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default InitialPopup;
