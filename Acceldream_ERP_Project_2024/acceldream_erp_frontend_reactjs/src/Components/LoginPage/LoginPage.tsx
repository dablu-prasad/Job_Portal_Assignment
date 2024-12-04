import React, { useState } from "react";
import "./LoginPage.css";
import Modal from "react-modal"
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../Graphql/mutations";
import { FormLoginError } from "../../types/types";
function LoginPage({openRegistorForm,setOpenRegistorForm}:{openRegistorForm:boolean,setOpenRegistorForm:any}) {
const [formData,setFormData]=useState({email:"",password:""})
const [formError,setFormError]=useState<FormLoginError>({})
const [login,{data,loading,error}]=useMutation(LOGIN_USER)
const navigate=useNavigate()
const handleChange = (e:any) => {
    e.preventDefault()
    const {name,value}=e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }
  const validateInput=()=>{
    const errorData:FormLoginError={}
    //email Validation
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
    setFormError(errorData);
    return errorData;
  }
  const handleSubmit=async(e:any)=>{
    e.preventDefault()
    const validateError:any=validateInput()
    if (Object.keys(validateError).length > 0) {
      return 0;                      // Stop submission if validation fails
    }
 
    try {
      const response= await login({
         variables: {
           email: formData.email,
           password: formData.password
         },
       });
       console.log("ddd",response.data.login)
       if(response.data.login.success)navigate(`/otp-verify?email=${response.data.login.email}`)
       alert('User Login successfully');
     } catch (err) {
       console.error('Error login user', err);
     }
  }
  return (
      <Modal
        isOpen={openRegistorForm}
        onRequestClose={() => setOpenRegistorForm(false)}
        className="login-modal"
      >
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit" className='login-btn-b1' >Login</button>
        </form>
      </Modal>
  );
}

export default LoginPage;

