import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Restaurants from './components/Restaurants';
import Hotels from './components/Hotels';
import Bookings from './components/Bookings'; // ✅ Correctly matches component name
import Menu from './components/Menu'; // Make sure this path is correct


import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/restaurants/:countryName" element={<Restaurants />} />
        <Route path="/hotels/:countryName" element={<Hotels />} />
        <Route path="/menu/:restaurantName" element={<Menu />} />
       


        <Route path="/booking" element={<Bookings />} /> {/* ✅ Fixed here */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default App;
