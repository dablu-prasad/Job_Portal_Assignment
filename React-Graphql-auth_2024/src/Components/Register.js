// RegistrationPage.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../Graphql/mutations';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password:'',
    mobile: '',
    description: '',
  });

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
const navigate=useNavigate()
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("FormData",formData)
     const response= await registerUser({
        variables: {
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
          description: formData.description,
        },
      });
      const token = response.data.createUser.token;
      localStorage.setItem('token', token); // Store token in localStorage
      navigate('/dashboard');
      alert('User registered successfully');
    } catch (err) {
      console.error('Error registering user', err);
    }
  };
console.log("Register Dat====>",data)
  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description about yourself"
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>Registration successful for user {data.createUser.userName} </p>}
    </div>
  );
};

export default RegistrationPage;
