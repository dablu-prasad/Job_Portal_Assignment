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
    mobile: "",
    company_dealer_name: "",
    branch: "",
    address: "",
    state: "",
    city: "",
    country: "",
    pin: "",
    module: "",
    user_designation: "",
    approval_manager: ""
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
    if (!formData.company_dealer_name.trim()) {
      errorData.company_dealer_name = "Company dealer name is required";
    } else if (formData.company_dealer_name.length < 2) {
      errorData.company_dealer_name = "Company dealer name must be at least 2 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.company_dealer_name)) {
      errorData.company_dealer_name = "Company dealer name can only contain letters";
    }
    if (!formData.branch.trim()) {
      errorData.branch = "Branch is required";
    } else if (formData.branch.length < 2) {
      errorData.branch = "Branch must be at least 2 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.lastname)) {
      errorData.branch = "Branch can only contain letters";
    }
    if (!formData.address.trim()) {
      errorData.address = "Address is required";
    } else if (formData.address.length < 2) {
      errorData.address = "Address must be at least 2 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.address)) {
      errorData.address = "Address can only contain letters";
    }
    if (!formData.state.trim()) {
      errorData.state = "State is required";
    } else if (formData.state.length < 2) {
      errorData.state = "State must be at least 2 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.state)) {
      errorData.state = "State can only contain letters";
    }
    if (!formData.city.trim()) {
      errorData.city = "City is required";
    } else if (formData.city.length < 2) {
      errorData.city = "City must be at least 2 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.city)) {
      errorData.city = "City can only contain letters";
    }
    if (!formData.pin.trim()) {
      errorData.pin = "Pin is required";
    } else if (formData.pin.length < 2) {
      errorData.pin = "Pin must be at least 2 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.pin)) {
      errorData.pin = "Pin can only contain letters";
    }
    if (!formData.country.trim()) {
      errorData.country = "Country is required";
    } else if (formData.country.length < 2) {
      errorData.country = "Country must be at least 2 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.country)) {
      errorData.country = "Country can only contain letters";
    }
    if (!formData.module.trim()) {
      errorData.module = "Module is required";
    } else if (formData.module.length < 2) {
      errorData.module = "Module must be at least 2 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.module)) {
      errorData.module = "Module can only contain letters";
    }
    if (!formData.user_designation.trim()) {
      errorData.user_designation = "User designation is required";
    } else if (formData.user_designation.length < 2) {
      errorData.user_designation = "User designation must be at least 2 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.user_designation)) {
      errorData.user_designation = "User designation can only contain letters";
    }
    if (!formData.approval_manager.trim()) {
      errorData.approval_manager = "Approval manager is required";
    } else if (formData.approval_manager.length < 2) {
      errorData.approval_manager = "Approval manager must be at least 2 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.approval_manager)) {
      errorData.approval_manager = "Approval manager can only contain letters";
    }
    if (!formData.email.trim()) {
      errorData.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errorData.email = "Email is not valid";
    }

    if (!formData.mobile.trim()) {
      errorData.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errorData.mobile = "Mobile number must be exactly 10 digits";
    }

    setFormError(errorData);
    return errorData;
  };
  console.log("formData",formData)
  const onHandleSubmit = async (e: any) => {
    e.preventDefault();
    const validateError = validateInput();
    if (Object.keys(validateError).length > 0) {
      return;
    }
    try {
      //   company_dealer_name:"",
      // branch:"",
      // address:"",
      // state:"",
      // city:"",
      // country:"",
      // pin:"",
      // module:"",
      // user_designation:"",
      // approval_manager:""
      const response = await registerUser({
        variables: {
          userName: formData.username,
          firstName: formData.firstname,
          lastName: formData.lastname,
          email: formData.email,
          mobile: formData.mobile,
          company_dealer_name: formData.company_dealer_name,
          branch: formData.branch,
          state: formData.state,
          city: formData.city,
          country: formData.country,
          pin: formData.pin,
          module: formData.module,
          user_designation: formData.user_designation,
          approval_manager: formData.approval_manager,
          address: formData.address,
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
      <h2>User Register</h2>
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

        <label>Phone Number</label>
        <input type="text" name="mobile" onChange={handleChange} />
        {formError.mobile && <p className="error-text">{formError.mobile}</p>}

        <label>Company Dealer Name</label>
        <select name="company_dealer_name" onChange={handleChange}>
          <option value="">Select Company</option>
          <option value="Dealer1">Dealer 1</option>
          <option value="Dealer2">Dealer 2</option>
          <option value="Dealer3">Dealer 3</option>
        </select>
        {formError.company_dealer_name && <p className="error-text">{formError.company_dealer_name}</p>}
        <label>Branch Name</label>
        <select name="branch" onChange={handleChange}>
          <option value="">Select Branch</option>
          <option value="tata">TATA Motors,Pune</option>
          <option value="tvs">TVS Motors,Noida</option>
          <option value="hero">Hero Motors,Noida</option>
        </select>
        {formError.branch && <p className="error-text">{formError.branch}</p>}

        <label>Approval Manager</label>
        <select name="approval_manager" onChange={handleChange}>
          <option value="">Select Manager</option>
          <option value="rakesh">Rakesh</option>
        </select>
        {formError.branch && <p className="error-text">{formError.branch}</p>}

        <label>User Designation</label>
        <select name="user_designation" onChange={handleChange}>
          <option value="">Select Designation</option>
          <option value="manager">Manager</option>
          <option value="executive">Executive</option>
        </select>
        {formError.user_designation && <p className="error-text">{formError.user_designation}</p>}


        <label>Module</label>
        <select name="module" onChange={handleChange}>
          <option value="">Select Module</option>
          <option value="sales">Sales</option>
          <option value="service">Service</option>
          <option value="spares">Spares</option>
        </select>
        {formError.module && <p className="error-text">{formError.module}</p>}

        <label>Address</label>
        <input type="text" name="address" onChange={handleChange} />
        {formError.address && <p className="error-text">{formError.address}</p>}

        <label>Country</label>
        <select name="country" onChange={handleChange}>
          <option value="">Select Country</option>
          <option value="india">India</option>
          <option value="nepal">Nepal</option>
          <option value="china">China</option>
        </select>
        {formError.country && <p className="error-text">{formError.country}</p>}

        <label>State</label>
        <select name="state" onChange={handleChange}>
          <option value="">Select State</option>
          <option value="puna">Pune</option>
          <option value="delhi">Delhi</option>
          <option value="hyderabad">Hyderabad</option>
        </select>
        {formError.state && <p className="error-text">{formError.state}</p>}

        <label>City</label>
        <select name="city" onChange={handleChange}>
          <option value="">Select City</option>
          <option value="noida">Noida</option>
          <option value="gorakhpur">Gorakhpur</option>
          <option value="deoria">Deoria</option>
        </select>
        {formError.city && <p className="error-text">{formError.city}</p>}

        <label>Pincode</label>
        <input type="text" name="pin" onChange={handleChange} />
        {formError.pin && <p className="error-text">{formError.pin}</p>}

        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? <div className="loader"></div> : "Submit Request"}
        </button>
        {errorMessage && <ErrorPopupPage message={errorMessage} onClose={closeErrorPopup} />}
        {successMessage && <SuccessPopupPage message={successMessage} onClose={closeSuccessPopup} />}
      </form>
    </Modal>
  );
}

export default RegistrationPage;
