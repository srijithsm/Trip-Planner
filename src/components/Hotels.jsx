import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Hotels.css';

const hotelsData = {
  'Tamil Nadu': [
    { name: 'Taj Chennai', image: '/images/hotel1.jpg', roomSize: 'Deluxe', cost: '₹4000/night', description: 'Luxury stay in Chennai', rating: 4.5, roomsAvailable: 12 },
    { name: 'Southern Comfort', image: '/images/hotel2.jpg', roomSize: 'Suite', cost: '₹5000/night', description: 'Elegant and traditional', rating: 4.2, roomsAvailable: 8 },
    { name: 'Coimbatore Heights', image: '/images/hotel3.jpg', roomSize: 'Executive', cost: '₹3200/night', description: 'Comfortable business hotel', rating: 4.0, roomsAvailable: 15 },
    { name: 'Madurai Heritage Inn', image: '/images/hotel4.jpg', roomSize: 'Standard', cost: '₹2500/night', description: 'Near Meenakshi Temple', rating: 3.8, roomsAvailable: 10 },
  ],
  'Kerala': [
    { name: 'Backwater Bliss', image: '/images/hotel1.jpg', roomSize: 'Lakeview', cost: '₹3500/night', description: 'Stay near the backwaters', rating: 4.3, roomsAvailable: 9 },
    { name: 'Coconut Grove', image: '/images/hotel2.jpg', roomSize: 'Standard', cost: '₹2800/night', description: 'Nature-filled budget hotel', rating: 4.0, roomsAvailable: 14 },
    { name: 'Munnar Mist Resort', image: '/images/hotel4.jpg', roomSize: 'Hillside', cost: '₹3900/night', description: 'Relax in the hills of Munnar', rating: 4.4, roomsAvailable: 6 },
    { name: 'Kochi Marina Bay', image: '/images/hotel3.jpg', roomSize: 'Sea View', cost: '₹4100/night', description: 'Overlooking the Arabian Sea', rating: 4.5, roomsAvailable: 11 },
  ],
  'Rajasthan': [
    { name: 'Jaipur Royal Palace', image: '/images/hotel1.jpg', roomSize: 'Heritage', cost: '₹4500/night', description: 'Live like royalty', rating: 4.6, roomsAvailable: 7 },
    { name: 'Udaipur Lakeside Inn', image: '/images/hotel3.jpg', roomSize: 'Lake View', cost: '₹4700/night', description: 'Romantic lakeside setting', rating: 4.4, roomsAvailable: 5 },
    { name: 'Jodhpur Desert Retreat', image: '/images/hotel2.jpg', roomSize: 'Luxury Tent', cost: '₹4200/night', description: 'Stay in the Thar Desert', rating: 4.1, roomsAvailable: 10 },
    { name: 'Bikaner Haveli Stay', image: '/images/hotel4.jpg', roomSize: 'Traditional', cost: '₹3000/night', description: 'Cultural heritage hotel', rating: 3.9, roomsAvailable: 13 },
  ],
  'Karnataka': [
    { name: 'Bangalore Grand', image: '/images/hotel1.jpg', roomSize: 'Executive', cost: '₹3900/night', description: 'Modern amenities in tech city', rating: 4.3, roomsAvailable: 16 },
    { name: 'Coorg Nature View', image: '/images/hotel4.jpg', roomSize: 'Cottage', cost: '₹3400/night', description: 'Amidst coffee plantations', rating: 4.2, roomsAvailable: 8 },
    { name: 'Mysore Palace View', image: '/images/hotel3.jpg', roomSize: 'Deluxe', cost: '₹3600/night', description: 'Near the Mysore Palace', rating: 4.0, roomsAvailable: 9 },
    { name: 'Hampi Heritage Camp', image: '/images/hotel2.jpg', roomSize: 'Rustic', cost: '₹3100/night', description: 'Stay near ancient ruins', rating: 3.8, roomsAvailable: 6 },
  ],
  'Maharashtra': [
    { name: 'Mumbai Sea Breeze', image: '/images/hotel1.jpg', roomSize: 'Sea View', cost: '₹5000/night', description: 'View of Marine Drive', rating: 4.6, roomsAvailable: 7 },
    { name: 'Pune Tech Inn', image: '/images/hotel3.jpg', roomSize: 'Business', cost: '₹3800/night', description: 'Ideal for business travelers', rating: 4.1, roomsAvailable: 12 },
    { name: 'Mahabaleshwar Misty Hills', image: '/images/hotel2.jpg', roomSize: 'Valley View', cost: '₹4000/night', description: 'Stay in the hills', rating: 4.3, roomsAvailable: 8 },
    { name: 'Nagpur Comfort Stay', image: '/images/hotel4.jpg', roomSize: 'Standard', cost: '₹2700/night', description: 'Affordable comfort', rating: 3.7, roomsAvailable: 14 },
  ],
  'Gujarat': [
    { name: 'Ahmedabad Heritage Inn', image: '/images/hotel1.jpg', roomSize: 'Deluxe', cost: '₹3500/night', description: 'Cultural experience in the city', rating: 4.0, roomsAvailable: 10 },
    { name: 'Dwarka Seaside Stay', image: '/images/hotel3.jpg', roomSize: 'Sea View', cost: '₹3200/night', description: 'Near the temple and beach', rating: 4.2, roomsAvailable: 9 },
    { name: 'Gir Forest Lodge', image: '/images/hotel2.jpg', roomSize: 'Jungle Cottage', cost: '₹3700/night', description: 'Stay near the lion reserve', rating: 4.5, roomsAvailable: 5 },
    { name: 'Kutch Desert Camp', image: '/images/hotel4.jpg', roomSize: 'Tent', cost: '₹3000/night', description: 'Experience the Rann of Kutch', rating: 4.1, roomsAvailable: 7 },
  ],
  'West Bengal': [
    { name: 'Kolkata Central Hotel', image: '/images/hotel2.jpg', roomSize: 'Executive', cost: '₹3600/night', description: 'Stay in the heart of the city', rating: 4.2, roomsAvailable: 11 },
    { name: 'Darjeeling Himalayan View', image: '/images/hotel1.jpg', roomSize: 'Mountain View', cost: '₹4100/night', description: 'Tea gardens and cool breeze', rating: 4.6, roomsAvailable: 6 },
    { name: 'Sundarbans Nature Camp', image: '/images/hotel3.jpg', roomSize: 'Cottage', cost: '₹2900/night', description: 'Near mangrove forests', rating: 4.0, roomsAvailable: 10 },
    { name: 'Shantiniketan Homestay', image: '/images/hotel4.jpg', roomSize: 'Traditional', cost: '₹2500/night', description: 'Cultural and peaceful', rating: 3.9, roomsAvailable: 13 },
  ],
  'Andhra Pradesh': [
    { name: 'Vijayawada Riverside', image: '/images/hotel2.jpg', roomSize: 'Deluxe', cost: '₹3200/night', description: 'On the banks of Krishna River', rating: 4.1, roomsAvailable: 12 },
    { name: 'Visakhapatnam Beach Resort', image: '/images/hotel3.jpg', roomSize: 'Sea View', cost: '₹4300/night', description: 'Close to RK beach', rating: 4.5, roomsAvailable: 9 },
    { name: 'Tirupati Devotional Stay', image: '/images/hotel1.jpg', roomSize: 'Pilgrim', cost: '₹2800/night', description: 'Convenient for temple visits', rating: 3.8, roomsAvailable: 15 },
    { name: 'Araku Valley Inn', image: '/images/hotel4.jpg', roomSize: 'Hill View', cost: '₹3100/night', description: 'Nature retreat in the valley', rating: 4.0, roomsAvailable: 7 },
  ],
  'Uttarakhand': [
    { name: 'Agra Taj View Hotel', image: '/images/hotel3.jpg', roomSize: 'Deluxe', cost: '₹4600/night', description: 'View of the Taj Mahal', rating: 4.6, roomsAvailable: 5 },
    { name: 'Varanasi Ganges Stay', image: '/images/hotel4.jpg', roomSize: 'Riverfront', cost: '₹3500/night', description: 'On the ghats of Ganga', rating: 4.2, roomsAvailable: 10 },
    { name: 'Lucknow Royal Residency', image: '/images/hotel1.jpg', roomSize: 'Heritage', cost: '₹3700/night', description: 'Nawabi elegance', rating: 4.0, roomsAvailable: 8 },
    { name: 'Prayagraj Pilgrim Inn', image: '/images/hotel2.jpg', roomSize: 'Standard', cost: '₹2900/night', description: 'Near Sangam and temples', rating: 3.9, roomsAvailable: 12 },
  ],
  'Punjab': [
    { name: 'Amritsar Golden Stay', image: '/images/hotel1.jpg', roomSize: 'Golden View', cost: '₹3600/night', description: 'Near the Golden Temple', rating: 4.5, roomsAvailable: 10 },
    { name: 'Ludhiana Central Inn', image: '/images/hotel2.jpg', roomSize: 'Business', cost: '₹3400/night', description: 'Centrally located for business trips', rating: 4.2, roomsAvailable: 7 },
    { name: 'Patiala Heritage House', image: '/images/hotel3.jpg', roomSize: 'Traditional', cost: '₹3200/night', description: 'Cultural vibes of Patiala', rating: 4.0, roomsAvailable: 6 },
    { name: 'Jalandhar Comfort Suites', image: '/images/hotel4.jpg', roomSize: 'Deluxe', cost: '₹3000/night', description: 'Modern amenities and comfort', rating: 4.1, roomsAvailable: 8 },
  ],
};


const Hotels = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const hotels = hotelsData[countryName] || [];

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="hotels-container">
      <h1 className="hotels-title">Top Hotels in {countryName}</h1>

      <div className="hotel-grid">
        {hotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
            <div className="hotel-info">
              <h3 className="hotel-name">{hotel.name}</h3>
              <p className="hotel-description">{hotel.description}</p>
              <div className="hotel-details">
                <p className="hotel-room">Room Type: {hotel.roomSize}</p>
                <p className="hotel-rooms">Rooms Available: {hotel.roomsAvailable}</p>
              </div>
              <div className="hotel-rating">
                {renderRatingStars(hotel.rating)}
                <span className="rating-value">({hotel.rating.toFixed(1)})</span>
              </div>
              <p className="hotel-cost"><strong>{hotel.cost}</strong></p>
            </div>
          </div>
        ))}
      </div>

      <button className="book-slot-button" onClick={() => navigate('/booking')}>
        Book Slot
      </button>
    </div>
  );
};

export default Hotels;