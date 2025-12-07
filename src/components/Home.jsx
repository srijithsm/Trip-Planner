import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const redirectToSignup = () => {
    navigate('/signup');
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="left-side" />
      
      <div className="right-side">
        <div className="button-group">
          <button className="signup-button" onClick={redirectToSignup}>
            Sign Up
          </button>
          <button className="login-button" onClick={redirectToLogin}>
            Login
          </button>
        </div>

        <div className="text-container">
          <div className="text-line">BOOK</div>
          <div className="text-line">YOUR</div>
          <div className="text-line">TRIP</div>
          <div className="text-line">HURRY UP!!</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
