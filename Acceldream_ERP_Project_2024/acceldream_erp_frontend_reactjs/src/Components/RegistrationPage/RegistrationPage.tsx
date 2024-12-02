

import { useState } from "react";
import "./RegisrationPage.css";
import Modal from "react-modal"
import { REGISTER_USER } from "../../Graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

function RegisrationPage({ openRegistorForm,setOpenRegistorForm }: { openRegistorForm: boolean,setOpenRegistorForm:any }) {

  const [registerUser,{data,loading,error}]=useMutation(REGISTER_USER)
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
  const onhandleSubmit=async(e:any)=>{
    e.preventDefault()
    console.log("formData",formData)
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
            required
          />
          <label>First Name</label>
          <input
            type='text'
            id="firstname"
            name="firstname"
            onChange={handleChange}
            required
          />
          <label>Last Name</label>
          <input
            type='text'
            id="lastname"
            name="lastname"
            onChange={handleChange}
            required
          />
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
          <label>Phone Number</label>
          <input
            type='text'
            id="mobile"
            name="mobile"
            onChange={handleChange}
            required
          />
          <button type="submit" className='register-btn' >Register</button>
        </form>
      </Modal>
  );
}

export default RegisrationPage;

