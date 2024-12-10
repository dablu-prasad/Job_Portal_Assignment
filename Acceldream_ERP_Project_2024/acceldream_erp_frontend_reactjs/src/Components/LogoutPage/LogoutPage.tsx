import React from "react";
import "./LogoutPage.css"; // Create this CSS file for styles

type LogoutPopupProps = {
    onConfirm: () => void; // Callback for the confirm action
    onCancel: () => void;  // Callback for the cancel action
  };
  const LogoutPage: React.FC<LogoutPopupProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>Are you sure you want to log out?</h3>
        <div className="popup-buttons">
          <button className="popup-btn yes-btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="popup-btn no-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
