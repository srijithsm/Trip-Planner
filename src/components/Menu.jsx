import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-image-container">
      <img src="/images/menu-background.webp" alt="Menu" className="menu-image" />
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
};

export default Menu;
