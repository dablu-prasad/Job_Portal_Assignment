

import { useEffect, useState } from "react";
import "./RegisrationPage.css";
import Modal from "react-modal"
function RegisrationPage({ openRegistorForm,setOpenRegistorForm }: { openRegistorForm: boolean,setOpenRegistorForm:any }) {
  const handleChange = () => {
  }

  const onhandleSubmit=()=>{
    
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

