import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../Graphql/mutations';
import { setUserToken } from '../Authenticates/isAuthenticated';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ variables: { email, password } });
      const token = response.data.login.token;
      setUserToken(token) // Store token in localStorage
      navigate('/dashboard'); // Redirect or do something after successful login
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Login failed: {error.message}</p>}
      {data && <p>Login successful!</p>}
      <br/>
      <button onClick={()=>navigate('/register')}>Register</button>
    </div>
  );
};

export default Login;
