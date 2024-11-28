
import React, { useState } from "react";
import "./RegisrationPage.css";

function RegisrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", mobile: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

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
    //   setFormData({ name: "", mobile: "" }); // Reset form
    // }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-input ${errors.name ? "input-error" : ""}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

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

        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
}

export default RegisrationPage;

