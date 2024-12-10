import { useState } from "react";
import "./RegistrationPage.css";
import Modal from "react-modal";
import { REGISTER_USER } from "../../Graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FormError } from "../../types/types";
import ErrorPopupPage from "../ErrorPopupPage/ErrorPopupPage";
import SuccessPopupPage from "../SuccessPopupPage/SuccessPopupPage";

function RegistrationPage({ openRegistorForm, setOpenRegistorForm }: { openRegistorForm: boolean; setOpenRegistorForm: any }) {
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const [formError, setFormError] = useState<FormError>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateInput = () => {
    const errorData: any = {};
    if (!formData.username.trim()) {
      errorData.username = "Username is required";
    } else if (formData.username.length < 3) {
      errorData.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      errorData.username = "Username can only contain letters and numbers";
    }

    if (!formData.firstname.trim()) {
      errorData.firstname = "First name is required";
    } else if (formData.firstname.length < 2) {
      errorData.firstname = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z]+$/.test(formData.firstname)) {
      errorData.firstname = "First name can only contain letters";
    }

    if (!formData.lastname.trim()) {
      errorData.lastname = "Last name is required";
    } else if (formData.lastname.length < 2) {
      errorData.lastname = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z]+$/.test(formData.lastname)) {
      errorData.lastname = "Last name can only contain letters";
    }

    if (!formData.email.trim()) {
      errorData.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errorData.email = "Email is not valid";
    }

    if (!formData.password.trim()) {
      errorData.password = "Password is required";
    } else if (formData.password.length < 8) {
      errorData.password = "Password must be at least 8 characters";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(formData.password)) {
      errorData.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (!formData.mobile.trim()) {
      errorData.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errorData.mobile = "Mobile number must be exactly 10 digits";
    }

    setFormError(errorData);
    return errorData;
  };
  const onHandleSubmit = async (e: any) => {
    e.preventDefault();
    const validateError = validateInput();
    if (Object.keys(validateError).length > 0) {
      return;
    }
    try {
      const response = await registerUser({
        variables: {
          userName: formData.username,
          firstName: formData.firstname,
          lastName: formData.lastname,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
        },
      });
        if (response.data.userRegister.success) {
          setSuccessMessage("User registered successfully");
          navigate(`/otp-verify?email=${response.data.userRegister.email}`);
        }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "An unknown error occurred.";
      setErrorMessage(message);
    }
  };
  const closeErrorPopup = () => {
    setErrorMessage("");
  };
  const closeSuccessPopup = () => {
    setSuccessMessage("");
  };

  return (
    <Modal isOpen={openRegistorForm} onRequestClose={() => setOpenRegistorForm(false)} className="register-modal">
      <h2>Registration Form</h2>

      <form onSubmit={onHandleSubmit} className="registor-form">
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} />
        {formError.username && <p className="error-text">{formError.username}</p>}

        <label>First Name</label>
        <input type="text" name="firstname" onChange={handleChange} />
        {formError.firstname && <p className="error-text">{formError.firstname}</p>}

        <label>Last Name</label>
        <input type="text" name="lastname" onChange={handleChange} />
        {formError.lastname && <p className="error-text">{formError.lastname}</p>}

        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} />
        {formError.email && <p className="error-text">{formError.email}</p>}

        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
        {formError.password && <p className="error-text">{formError.password}</p>}

        <label>Phone Number</label>
        <input type="text" name="mobile" onChange={handleChange} />
        {formError.mobile && <p className="error-text">{formError.mobile}</p>}

        <button type="submit" className="register-btn" disabled={loading}>
        {loading ? <div className="loader"></div> : "Register"}  
        </button>
        {errorMessage && <ErrorPopupPage message={errorMessage} onClose={closeErrorPopup} />}
        {successMessage && <SuccessPopupPage message={successMessage} onClose={closeSuccessPopup} />}
      </form>
    </Modal>
  );
}

export default RegistrationPage;
