import React from "react";
import "./SuccessPopupPage.css";

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const SuccessPopupPage: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="success-popup">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SuccessPopupPage;
