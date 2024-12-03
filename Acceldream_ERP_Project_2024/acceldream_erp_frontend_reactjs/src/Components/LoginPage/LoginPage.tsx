import React, { useState } from "react";
import "./LoginPage.css";
import Modal from "react-modal"
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../Graphql/mutations";
function LoginPage({openRegistorForm,setOpenRegistorForm}:{openRegistorForm:boolean,setOpenRegistorForm:any}) {
const [formData,setFormData]=useState({email:"",password:""})
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
  const handleSubmit=async(e:any)=>{
    e.preventDefault()
    console.log("formData",formData)
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
            required
          />
          <label>Password</label>
          <input
            type='text'
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
          <button type="submit" className='login-btn-b1' >Login</button>
        </form>
      </Modal>
  );
}

export default LoginPage;

