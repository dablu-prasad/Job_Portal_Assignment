import React, { useState } from "react";
import Modal from "react-modal";
import "./ResetPasswordPage.css"; // Add custom CSS styles here
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../Graphql/mutations";
import { getAuthHeaders } from "../../Authenticates/isAuthenticated";
import ErrorPopupPage from "../ErrorPopupPage/ErrorPopupPage";
import SuccessPopupPage from "../SuccessPopupPage/SuccessPopupPage";
import { useNavigate } from "react-router-dom";

interface ResetPasswordPageProps {
  ID: string;
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  ID,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    _id: ID,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, getAuthHeaders())
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  let navigate = useNavigate()
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log("con", formData)
      const response = await resetPassword({
        variables: {
          ID: formData._id, // Ensure `id` is passed correctly, likely from props or state
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmNewPassword: formData.confirmNewPassword,
        },
      });
      console.log("response", response)
      if (response.data.resetPassword.success) {
        setSuccessMessage("Password reset successfully.");
        navigate("/dashboard");
      }
      onClose();
    } catch (error: any) {
      console.log("error.message", error)
      setErrorMessage(error.message || "An unknown error occurred.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="reset-user-modal"
    //   overlayClassName="reset-user-overlay"
    >
      <div className="reset-user-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} className="reset-user-form">
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
          <div className="reset-form-buttons">
            <button type="submit" className="reset-save-button">{loading ? "Loading..." : "Reset Password"}</button>
            <button type="button" className="reset-cancel-button" onClick={onClose}>Cancel</button>
            {errorMessage && (
              <ErrorPopupPage message={errorMessage} onClose={() => setErrorMessage("")} />
            )}
            {successMessage && (
              <SuccessPopupPage
                message={successMessage}
                onClose={() => setSuccessMessage("")}
              />
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResetPasswordPage;
