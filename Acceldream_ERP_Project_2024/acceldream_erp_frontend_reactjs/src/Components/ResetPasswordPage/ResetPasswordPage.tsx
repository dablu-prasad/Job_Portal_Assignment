import React, { useState } from "react";
import Modal from "react-modal";
import "./ResetPasswordPage.css"; // Add custom CSS styles here

interface ResetPasswordPageProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
const ResetPasswordPage : React.FC<ResetPasswordPageProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword:"",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="edit-user-modal"
    //   overlayClassName="edit-user-overlay"
    >
      <div className="edit-user-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} className="edit-user-form">
          <label>Current Password</label>
          <input
            type="text"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />

          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
          <div className="form-buttons">
            <button type="submit" className="save-button">Reset Password</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResetPasswordPage;
