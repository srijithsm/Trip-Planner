import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reuse same styling

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Signup successful! Redirecting to login...');
        setError('');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(data.error || 'Signup failed');
        setSuccess('');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <h2>Create Account</h2>
      <form className="login-form" onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default Signup;
