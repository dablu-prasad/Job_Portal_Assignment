
import React, { useState } from "react";
import "./LoginPage.css";
import Modal from "react-modal"
function LoginPage({openRegistorForm,setOpenRegistorForm}:{openRegistorForm:boolean,setOpenRegistorForm:any}) {

  const handleChange = () => {

  }
  const handleSubmit=()=>{
    
  }
  return (
      <Modal
        isOpen={openRegistorForm}
        onRequestClose={() => setOpenRegistorForm(false)}
        className="login-modal"
      >
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Phone Number</label>
          <input
            type='text'
            id="mobile"
            name="mobile"
            onChange={handleChange}
            required
          />
          <button type="submit" className='login-btn-b1' >Login</button>
        </form>
      </Modal>
  );
}

export default LoginPage;

