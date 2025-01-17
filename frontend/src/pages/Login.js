import React, { useState } from 'react';
import axios from 'axios';
import '../styling/login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });
      const token = response.data.token;
      // Store token in local storage
      localStorage.setItem('token', token);
      // Call onLogin callback to update authentication state
      onLogin(token);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>
  );
};

export default Login;
