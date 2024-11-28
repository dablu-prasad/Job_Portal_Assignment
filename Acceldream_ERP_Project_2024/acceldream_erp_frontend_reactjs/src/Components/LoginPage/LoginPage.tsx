
import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    mobile: "",
  });

  const [errors, setErrors] = useState({
    mobile: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {mobile: "" };

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // if (validate()) {
    //   console.log("Form Data Submitted: ", formData);
    //   alert("Form submitted successfully!");
    //   setFormData({ mobile: "" }); // Reset form
    // }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="mobile" className="form-label">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            className={`form-input ${errors.mobile ? "input-error" : ""}`}
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="error-message">{errors.mobile}</p>}
        </div>

        <button type="submit" className="form-button">Send OTP</button>
      </form>
    </div>
  );
}

export default LoginPage;

