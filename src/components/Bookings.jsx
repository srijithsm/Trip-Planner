import React, { useState } from 'react';
import axios from 'axios';
import './Bookings.css';
import jsPDF from 'jspdf';
import sampleQr from "../assets/sample-qr.png";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    destination: '',
    restaurant: '',
    hotel: '',
    days: '',
    travelMode: '',
    persons: '',
    budget: '',
    requirements: '',
    startDate: '',
    paymentScreenshot: null
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

    const destinations = [
    { value: 'TamilNadu', label: 'Tamil Nadu' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'MadhyaPradesh', label: 'Madhya Pradesh' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'WestBengal', label: 'West Bengal' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'Punjab', label: 'Punjab' },
  ];

  const destinationRestaurants = {
    TamilNadu: [
      { name: 'Chennai Spice', image: '/images/food1.jpg', description: 'Authentic Tamil cuisine', rating: 4.5 },
      { name: 'Madurai Meals', image: '/images/food2.jpg', description: 'Traditional South Indian thalis', rating: 4.2 },
      { name: 'Coimbatore Curry', image: '/images/food3.jpg', description: 'Tiffin specials', rating: 4.3 },
      { name: 'Tanjore Treats', image: '/images/food4.jpg', description: 'Temple town tastes', rating: 4.4 },
    ],
    Kerala: [
      { name: 'Backwater Bites', image: '/images/food3.jpg', description: 'Seafood and coconut-rich dishes', rating: 4.6 },
      { name: 'Munnar Mist Cafe', image: '/images/food1.jpg', description: 'Tea valley delicacies', rating: 4.1 },
      { name: 'Alleppey Aroma', image: '/images/food2.jpg', description: 'Backwater seafood flavors',  rating: 4.3 },
      { name: 'Trivandrum Treat', image: '/images/food4.jpg', description: 'Capital bites', rating: 4.2 },
    ],
    Rajasthan: [
      { name: 'Jaipur Tandoori', image: '/images/food1.jpg', description: 'Royal Rajasthani feasts', rating: 4.8 },
      { name: 'Udaipur Flavors', image: '/images/food2.jpg', description: 'Desert spices & sweets',  rating: 4.4 },
      { name: 'Jodhpur Kitchen', image: '/images/food4.jpg', description: 'Marwari meals',  rating: 4.3 },
      { name: 'Bikaner Bhujia House', image: '/images/food3.jpg', description: 'Snacks and sweets', rating: 4.1 },
    ],
    MadhyaPradesh: [
      { name: 'Indore Eatery', image: '/images/food1.jpg', description: 'Poha, jalebi, and more',  rating: 4.5 },
      { name: 'Bhopal Biryani House', image: '/images/food4.jpg', description: 'Biryani & kebabs',  rating: 4.6 },
      { name: 'Gwalior Grub', image: '/images/food3.jpg', description: 'Spicy snacks & sweets', rating: 4.2 },
      { name: 'Jabalpur Junction', image: '/images/food2.jpg', description: 'MP street eats',  rating: 4.3 },
    ],
    Karnataka: [
      { name: 'Bangalore Bistro', image: '/images/food2.jpg', description: 'Idli-dosa combos and more',  rating: 4.5 },
      { name: 'Hampi Heritage Dine', image: '/images/food3.jpg', description: 'Food with history',  rating: 4.4 },
      { name: 'Mysuru Morsel', image: '/images/food1.jpg', description: 'Royal Karnataka flavors',  rating: 4.3 },
      { name: 'Udupi Utsav', image: '/images/food4.jpg', description: 'Veg delight',  rating: 4.2 },
    ],
    Maharashtra: [
      { name: 'Mumbai Masala', image: '/images/food1.jpg', description: 'Vada pav to misal pav',  rating: 4.6 },
      { name: 'Pune Plates', image: '/images/food4.jpg', description: 'Local Maharashtrian snacks',rating: 4.4 },
      { name: 'Nagpur Nawaab', image: '/images/food3.jpg', description: 'Saoji food central', rating: 4.3 },
      { name: 'Kolhapur Kitchen', image: '/images/food2.jpg', description: 'Spicy non-veg treats', rating: 4.2 },
    ],
    WestBengal: [
      { name: 'Kolkata Kitchen', image: '/images/food3.jpg', description: 'Fish curry, rice & sweets',  rating: 4.7 },
      { name: 'Darjeeling Delights', image: '/images/food1.jpg', description: 'Momos and thukpa', rating: 4.4 },
      { name: 'Howrah House', image: '/images/food2.jpg', description: 'Chaats & rolls',  rating: 4.3 },
      { name: 'Sundarbans Spice', image: '/images/food4.jpg', description: 'Coastal flavors',  rating: 4.2 },
    ],
    Uttarakhand: [
      { name: 'Rishikesh Retreat', image: '/images/food4.jpg', description: 'Healthy and soulful food',  rating: 4.3 },
      { name: 'Nainital Nest', image: '/images/food1.jpg', description: 'Himalayan flavors',  rating: 4.4 },
      { name: 'Mussoorie Meals', image: '/images/food2.jpg', description: 'Colonial comfort food',  rating: 4.2 },
      { name: 'Dehradun Dine', image: '/images/food3.jpg', description: 'Simple and satisfying',  rating: 4.1 },
    ],
    Punjab: [
      { name: 'Amritsar Haveli', image: '/images/food1.jpg', description: 'Butter chicken & parathas',  rating: 4.8 },
      { name: 'Patiala Platters', image: '/images/food2.jpg', description: 'Rich Punjabi thalis',  rating: 4.5 },
      { name: 'Ludhiana Lassi', image: '/images/food3.jpg', description: 'Snacks and drinks',  rating: 4.4 },
      { name: 'Chandigarh Chaat', image: '/images/food4.jpg', description: 'Street food galore',  rating: 4.3 },
    ],
  };

  const destinationHotels = {
    TamilNadu: ['Taj Chennai', 'Southern Comfort', 'Madurai Heritage Inn','Coimbatore Heights'],
    Kerala: ['Backwater Bliss', 'Coconut Grove', 'Munnar Mist Resort'],
    Rajasthan: ['Jaipur Royal Palace', 'Jodhpur Desert Retreat', 'Bikaner Haveli','Udaipur Lakeside Palace'],
    MadhyaPradesh: ['Indore Inn', 'Bhopal Residency', 'Gwalior Grand'],
    Karnataka: ['Bangalore Grand', 'Coorg Nature View', 'Mysore Palace View','Hampi Heritage Camp'],
    Maharashtra: ['Mumbai Sea Breeze', 'Pune Grand Hotel', 'Mahabaleshwar Misty Hills','Nagpur Comfort Stay'],
    WestBengal: ['Kolkata Royal', 'Darjeeling Viewpoint Hotel', 'Sundarbans Safari Lodge'],
    Uttarakhand: ['Agra Taj View Hotel', 'Varanasi Ganges Stay', 'Lucknow Royal Residency','Prayagraj Pilgrim Inn'],
    Punjab: ['Amritsar Golden Stay', 'Patiala Heritage House', 'Jalandhar Comfort Suites','Ludhiana Central Inn'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'destination' ? { restaurant: '', hotel: '' } : {})
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        paymentScreenshot: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    

    doc.setFontSize(20);
    doc.text('Travel Booking Confirmation', 105, 20, { align: 'center' });
  
    doc.setFontSize(12);
    const lineSpacing = 10;
    let y = 40;

    const details = [
      `Name: ${bookingDetails.name}`,
      `Age: ${bookingDetails.age}`,
      `Phone: ${bookingDetails.phone}`,
      `Destination: ${bookingDetails.destination}`,
      `Restaurant: ${bookingDetails.restaurant}`,
      `Hotel: ${bookingDetails.hotel}`,
      `Duration: ${bookingDetails.days} days`,
      `Travel Mode: ${bookingDetails.travelMode}`,
      `Number of Persons: ${bookingDetails.persons}`,
      `Budget: ₹${bookingDetails.budget}`,
      `Start Date: ${new Date(bookingDetails.startDate).toLocaleDateString()}`,
      `Special Requirements: ${bookingDetails.requirements || 'N/A'}`
    ];

    details.forEach(detail => {
      doc.text(detail, 20, y);
      y += lineSpacing;
    });

    doc.save('booking-confirmation.pdf');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const { paymentScreenshot, ...dataToSend } = formData;
    axios.post('http://localhost:5000/api/bookings', dataToSend)
      .then(() => {
        setBookingSuccess(true);
        setBookingDetails(formData);
        setFormData({
          name: '', age: '', phone: '', destination: '', restaurant: '',
          hotel: '', days: '', travelMode: '', persons: '', budget: '',
          requirements: '', startDate: '', paymentScreenshot: null
        });
        setPreviewImage(null);
      })
      .catch(err => {
        console.error(err);
        alert('There was an error. Please try again.');
      });
  };

  const availableRestaurants = formData.destination ? destinationRestaurants[formData.destination] || [] : [];
  const availableHotels = formData.destination ? destinationHotels[formData.destination] || [] : [];

  return (
    <div className="booking-container">
      {bookingSuccess ? (
        <div className="booking-success">
          <h2>Booking Confirmed!</h2>
          <p>Your travel slot has been successfully booked.</p>
          <button onClick={generatePDF} className="download-button">Download Booking Details as PDF</button>
          <button onClick={() => setBookingSuccess(false)} className="new-booking-button">Make Another Booking</button>
        </div>
      ) : (
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Book Your Trip</h2>

          <div className="form-group">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <select name="destination" value={formData.destination} onChange={handleChange} required>
              <option value="">Select Destination</option>
              {destinations.map(dest => (
                <option key={dest.value} value={dest.value}>{dest.label}</option>
              ))}
            </select>

            <select name="restaurant" value={formData.restaurant} onChange={handleChange} required>
              <option value="">Select Restaurant</option>
              {availableRestaurants.map(r => (
                <option key={r.name} value={r.name}>
                  {r.name} - {r.description} - {r.cost} - Rating: {r.rating}
                </option>
              ))}
            </select>

            <select name="hotel" value={formData.hotel} onChange={handleChange} required>
              <option value="">Select Hotel</option>
              {availableHotels.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input type="number" name="days" placeholder="No. of Days" value={formData.days} onChange={handleChange} required />
            <select name="travelMode" value={formData.travelMode} onChange={handleChange} required>
              <option value="">Travel Mode</option>
              <option value="Flight">Flight</option>
              <option value="Train">Train</option>
              <option value="Bus">Bus</option>
              <option value="Car">Car</option>
            </select>
            <input type="number" name="persons" placeholder="No. of Persons" value={formData.persons} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input type="number" name="budget" placeholder="Budget (INR)" value={formData.budget} onChange={handleChange} required />
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
          </div>

          <textarea
            name="requirements"
            placeholder="Any special requirements"
            value={formData.requirements}
            onChange={handleChange}
          ></textarea>

          {/* New Payment Section */}
          <div className="payment-section">
            <div className="payment-input">
              <label htmlFor="paymentScreenshot">Upload GPay Screenshot:</label>
              <input 
                type="file" 
                id="paymentScreenshot" 
                name="paymentScreenshot" 
                accept="image/*" 
                onChange={handleFileChange}
              />
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="Payment preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
              )}
            </div>
            <div className="qr-sample">
              <p>Scan this QR for payment:</p>
              <img src={sampleQr} alt="Sample QR Code" style={{ width: '100px', height: '100px' }} />
            </div>
          </div>

          <button type="submit" className="confirm-button">Confirm Slot</button>
        </form>
      )}
    </div>
  );
};

export default Booking;