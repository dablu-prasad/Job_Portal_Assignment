import React, { useState } from "react";
import "./LoginPage.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../Graphql/mutations";
import { FormLoginError } from "../../types/types";

function LoginPage({ openRegistorForm, setOpenRegistorForm }: { openRegistorForm: boolean; setOpenRegistorForm: any }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState<FormLoginError>({});
  const [login, { loading }] = useMutation(LOGIN_USER);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateInput = () => {
    const errorData: FormLoginError = {};

    // Email Validation
    if (!formData.email.trim()) {
      errorData.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errorData.email = "Email is not valid";
    }

    // Password Validation
    if (!formData.password.trim()) {
      errorData.password = "Password is required";
    } else if (formData.password.length < 8) {
      errorData.password = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(formData.password)
    ) {
      errorData.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    setFormError(errorData);
    return errorData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validateError = validateInput();
    if (Object.keys(validateError).length > 0) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (response.data.login.success) {
        navigate(`/otp-verify?email=${response.data.login.email}`);
      } else {
        setApiError(response.data.login.message || "Login failed.");
      }
    } catch (err: any) {
      setApiError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <Modal
      isOpen={openRegistorForm}
      onRequestClose={() => setOpenRegistorForm(false)}
      className="login-modal"
      ariaHideApp={false}
      aria={{
        labelledby: "login-form-title",
      }}
    >
      <h2 id="login-form-title">Login Form</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {apiError && <p className="error-text api-error"><sup>*</sup>{apiError}</p>}
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        {formError?.email && <p className="error-text"><sup>*</sup>{formError.email}</p>}

        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        {formError?.password && <p className="error-text"><sup>*</sup>{formError.password}</p>}

        <button type="submit" className="login-btn-b1" disabled={loading}>
          {loading ? <div className="loader"></div> : "Login"}
        </button>
      </form>
    </Modal>
  );
}

export default LoginPage;
