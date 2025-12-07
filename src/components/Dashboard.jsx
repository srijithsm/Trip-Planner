import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const destinations = [
  {
    name: 'Tamil Nadu',
    image: '/images/Tamilnadu.gif',
    description: 'Known for its ancient temples, classical arts, and Dravidian architecture. Explore the cultural richness of Chennai, Madurai, and Kanyakumari.',
    places: ['Chennai', 'Madurai', 'Kanyakumari', 'Thanjavur', 'Rameswaram']
  },
  {
    name: 'Kerala',
    image: '/images/Kerala.gif',
    description: 'Famous for its serene backwaters, lush greenery, and Ayurvedic traditions. Discover the beauty of Alleppey, Munnar, and Kochi.',
    places: ['Alleppey', 'Munnar', 'Kochi', 'Thekkady', 'Wayanad']
  },
  {
    name: 'Rajasthan',
    image: '/images/Rajesthan.gif',
    description: 'Land of kings, forts, and deserts with a royal heritage. Visit Jaipur, Udaipur, and Jaisalmer for vibrant colors and history.Enjoy your Trip with',
    places: ['Jaipur', 'Udaipur', 'Jaisalmer', 'Jodhpur', 'Mount Abu']
  },
  {
    name: 'Madhya Pradesh',
    image: '/images/MadhyaPradesh.gif',
    description: 'A paradise for nature lovers and adventure seekers. Explore Manali, Shimla, and Dharamshala amidst the Himalayas.',
    places: ['Bhopal', 'Khajuraho', 'Kanha', 'Bandhavgarh', 'Pachmarhi']
  },
  {
    name: 'Karnataka',
    image: '/images/Karnataka.gif',
    description: 'Blend of modern cities and historical monuments. Explore Bengaluru’s tech vibe and Hampi’s ancient ruins.',
    places: ['Bengaluru', 'Hampi', 'Mysuru', 'Coorg', 'Badami']
  },
  {
    name: 'Maharashtra',
    image: '/images/Maharastra.gif',
    description: 'Home to Mumbai, the city of dreams, and ancient caves. Visit Pune, Lonavala, and the iconic Ajanta & Ellora caves.',
    places: ['Mumbai', 'Pune', 'Lonavala', 'Ajanta Caves', 'Ellora Caves']
  },
  {
    name: 'West Bengal',
    image: '/images/WestBengal.gif',
    description: 'Known for its literary heritage, art, and the Sundarbans. Explore Kolkata, Darjeeling, and Shantiniketan.',
    places: ['Kolkata', 'Darjeeling', 'Shantiniketan', 'Sundarbans', 'Kalimpong']
  },
  {
    name: 'Uttarakhand',
    image: '/images/Uttarkhand.gif',
    description: 'Land of Gods with scenic mountains and pilgrimage sites. Visit Rishikesh, Nainital, and the Valley of Flowers.',
    places: ['Rishikesh', 'Nainital', 'Valley of Flowers', 'Haridwar', 'Mussoorie']
  },
  {
    name: 'Punjab',
    image: '/images/punjab.gif',
    description: 'Famous for its rich culture, cuisine, and the Golden Temple. Experience the warmth of Amritsar, Ludhiana, and Patiala.',
    places: ['Amritsar', 'Ludhiana', 'Patiala', 'Jalandhar', 'Anandpur Sahib']
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [visiblePlaces, setVisiblePlaces] = useState({});

  const handleDestinationClick = (stateName) => {
    navigate(`/restaurants/${stateName}`);
  };

  const togglePlaces = (stateName) => {
    setVisiblePlaces(prev => ({
      ...prev,
      [stateName]: !prev[stateName]
    }));
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Explore Destinations</h1>
      <div className="destination-grid">
        {destinations.map((dest, index) => (
          <div key={index} className="destination-card">
            <img
              src={dest.image}
              alt={dest.name}
              className="destination-image"
              onClick={() => handleDestinationClick(dest.name)}
              style={{ cursor: 'pointer' }}
            />
            <h2 className="destination-name">{dest.name}</h2>
            <p className="destination-description">{dest.description}</p>
            <button className="visit-button" onClick={() => togglePlaces(dest.name)}>
              {visiblePlaces[dest.name] ? 'Hide Places' : 'Visit Places'}
            </button>
            {visiblePlaces[dest.name] && (
              <ul className="places-list">
                {dest.places.map((place, i) => (
                  <li key={i}>{place}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
