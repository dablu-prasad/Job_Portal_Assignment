

import { useState } from "react";
import "./RegisrationPage.css";
import Modal from "react-modal"
import { REGISTER_USER } from "../../Graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FormError } from "../../types/types";

function RegisrationPage({ openRegistorForm,setOpenRegistorForm }: { openRegistorForm: boolean,setOpenRegistorForm:any }) {

  const [registerUser,{data,loading,error}]=useMutation(REGISTER_USER)
  const [formError,setFormError] =useState<FormError>({})
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    username:"",
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    mobile:"",
  })
  const handleChange = (e:any) => {
    const {name,value}=e.target
    setFormData({
      ...formData,
    [name]:value
    })
  }

  const validateInput = () => {
    const errorData: any = {};
  
    // Username validation
    if (!formData.username.trim()) {
      errorData.username = "Username is required";
    } else if (formData.username.length < 3) {
      errorData.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      errorData.username = "Username can only contain letters and numbers";
    }
  
    // First Name validation
    if (!formData.firstname.trim()) {
      errorData.firstname = "First name is required";
    } else if (formData.firstname.length < 2) {
      errorData.firstname = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z]+$/.test(formData.firstname)) {
      errorData.firstname = "First name can only contain letters";
    }
  
    // Last Name validation
    if (!formData.lastname.trim()) {
      errorData.lastname = "Last name is required";
    } else if (formData.lastname.length < 2) {
      errorData.lastname = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z]+$/.test(formData.lastname)) {
      errorData.lastname = "Last name can only contain letters";
    }
  
    // Email validation
    if (!formData.email.trim()) {
      errorData.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errorData.email = "Email is not valid";
    }
  
    // Password validation
    if (!formData.password.trim()) {
      errorData.password = "Password is required";
    } else if (formData.password.length < 8) {
      errorData.password = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
        formData.password
      )
    ) {
      errorData.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
  
    // Mobile number validation
    if (!formData.mobile.trim()) {
      errorData.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errorData.mobile = "Mobile number must be exactly 10 digits";
    }
  
    setFormError(errorData);
    return errorData;
  };
  
  const onhandleSubmit=async(e:any)=>{
    e.preventDefault()
    console.log("formData=====>", formData);
    const validateError = validateInput();
    if (Object.keys(validateError).length > 0) {
      return; // Stop form submission if there are validation errors
    }
    console.log("formData", formData);
    try {
      const response= await registerUser({
         variables: {
           userName: formData.username,
           firstName:formData.firstname,
           lastName:formData.lastname,
           email: formData.email,
           password: formData.password,
           mobile: formData.mobile,
         },
       });
       console.log("ddd",response.data.userRegister)
       if(response.data.userRegister.success)navigate(`/otp-verify?email=${response.data.userRegister.email}`)
       alert('User registered successfully');
     } catch (err) {
       console.error('Error registering user', err);
     }
  }

  return (
      <Modal
        isOpen={openRegistorForm}
        onRequestClose={() => setOpenRegistorForm(false)}
        className="register-modal"
      >
        <h2>Registration Form</h2>
        <form onSubmit={onhandleSubmit} className="registor-form">
          <label>Username</label>
          <input
            type='text'
            id="username"
            name="username"
            onChange={handleChange}
            
          />
          {formError?.username && <p className="error-text"><sup>*</sup>{formError.username}</p>}
          <label>First Name</label>
          <input
            type='text'
            id="firstname"
            name="firstname"
            onChange={handleChange}
            
          />
             {formError?.firstname && <p className="error-text"><sup>*</sup>{formError.firstname}</p>}
          <label>Last Name</label>
          <input
            type='text'
            id="lastname"
            name="lastname"
            onChange={handleChange}
            
          />
            {formError?.lastname && <p className="error-text"><sup>*</sup>{formError.lastname}</p>}
          <label>Email</label>
          <input
            type='text'
            id="email"
            name="email"
            onChange={handleChange}
          
          />
            {formError?.email && <p className="error-text"><sup>*</sup>{formError.email}</p>}
          <label>Password</label>
          <input
            type='text'
            id="password"
            name="password"
            onChange={handleChange}
            
          />
            {formError?.password && <p className="error-text"><sup>*</sup>{formError.password}</p>}
          <label>Phone Number</label>
          <input
            type='text'
            id="mobile"
            name="mobile"
            onChange={handleChange}
            
          />
            {formError?.mobile && <p className="error-text"><sup>*</sup>{formError.mobile}</p>}
          <button type="submit" className='register-btn' >Register</button>
        </form>
      </Modal>
  );
}

export default RegisrationPage;

