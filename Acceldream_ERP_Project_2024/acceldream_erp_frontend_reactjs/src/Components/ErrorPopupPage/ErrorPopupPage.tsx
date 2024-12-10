import React from "react";
import "./ErrorPopupPage.css"; // Optional: Add custom styles


const ErrorPopupPage = ({ message, onClose }:{message:string;onClose:()=>void;}) => {
  if (!message) return null;

  return (
    <div className="error-popup-overlay">
      <div className="error-popup">
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorPopupPage;
