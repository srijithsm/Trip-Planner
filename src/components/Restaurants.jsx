import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Restaurants.css';

const restaurantsData = {
  'Tamil Nadu': [
    { name: 'Chennai Spice', image: '/images/food1.jpg', description: 'Authentic Tamil cuisine', rating: 4.5 },
      { name: 'Madurai Meals', image: '/images/food2.jpg', description: 'Traditional South Indian thalis', rating: 4.2 },
      { name: 'Coimbatore Curry', image: '/images/food3.jpg', description: 'Tiffin specials', rating: 4.3 },
      { name: 'Tanjore Treats', image: '/images/food4.jpg', description: 'Temple town tastes', rating: 4.4 },
  ],
  'Kerala': [
    { name: 'Backwater Bites', image: '/images/food3.jpg', description: 'Seafood and coconut-rich dishes', rating: 4.6 },
    { name: 'Munnar Mist Cafe', image: '/images/food1.jpg', description: 'Tea valley delicacies',  rating: 4.1 },
    { name: 'Alleppey Aroma', image: '/images/food2.jpg', description: 'Backwater seafood flavors', rating: 4.3 },
    { name: 'Trivandrum Treat', image: '/images/food4.jpg', description: 'Capital bites',  rating: 4.2 },
  ],
  'Rajasthan': [
    { name: 'Jaipur Tandoori', image: '/images/food1.jpg', description: 'Royal Rajasthani feasts',  rating: 4.8 },
    { name: 'Udaipur Flavors', image: '/images/food2.jpg', description: 'Desert spices & sweets', rating: 4.4 },
    { name: 'Jodhpur Kitchen', image: '/images/food4.jpg', description: 'Marwari meals',  rating: 4.3 },
    { name: 'Bikaner Bhujia House', image: '/images/food3.jpg', description: 'Snacks and sweets', rating: 4.1 },
  ],
  'Madhya Pradesh': [
    { name: 'Indore Eatery', image: '/images/food1.jpg', description: 'Poha, jalebi, and more',  rating: 4.5 },
    { name: 'Bhopal Biryani House', image: '/images/food4.jpg', description: 'Biryani & kebabs',  rating: 4.6 },
    { name: 'Gwalior Grub', image: '/images/food3.jpg', description: 'Spicy snacks & sweets',  rating: 4.2 },
    { name: 'Jabalpur Junction', image: '/images/food2.jpg', description: 'MP street eats', rating: 4.3 },
  ],
  'Karnataka': [
    { name: 'Bangalore Bistro', image: '/images/food2.jpg', description: 'Idli-dosa combos and more',  rating: 4.5 },
    { name: 'Hampi Heritage Dine', image: '/images/food3.jpg', description: 'Food with history', rating: 4.4 },
    { name: 'Mysuru Morsel', image: '/images/food1.jpg', description: 'Royal Karnataka flavors',  rating: 4.3 },
    { name: 'Udupi Utsav', image: '/images/food4.jpg', description: 'Veg delight', rating: 4.2 },
  ],
  'Maharashtra': [
    { name: 'Mumbai Masala', image: '/images/food1.jpg', description: 'Vada pav to misal pav',  rating: 4.6 },
    { name: 'Pune Plates', image:'/images/food4.jpg', description: 'Local Maharashtrian snacks',  rating: 4.4 },
    { name: 'Nagpur Nawaab', image: '/images/food3.jpg', description: 'Saoji food central',rating: 4.3 },
    { name: 'Kolhapur Kitchen', image: '/images/food2.jpg', description: 'Spicy non-veg treats',  rating: 4.2 },
  ],
  'West Bengal': [
    { name: 'Kolkata Kitchen', image: '/images/food3.jpg', description: 'Fish curry, rice & sweets',  rating: 4.7 },
    { name: 'Darjeeling Delights', image: '/images/food1.jpg', description: 'Momos and thukpa', rating: 4.4 },
    { name: 'Howrah House', image: '/images/food2.jpg', description: 'Chaats & rolls',  rating: 4.3 },
    { name: 'Sundarbans Spice', image:'/images/food4.jpg', description: 'Coastal flavors',  rating: 4.2 },
  ],
  'Uttarakhand': [
    { name: 'Rishikesh Retreat', image:'/images/food4.jpg', description: 'Healthy and soulful food',  rating: 4.3 },
    { name: 'Nainital Nest', image: '/images/food1.jpg', description: 'Himalayan flavors',rating: 4.4 },
    { name: 'Mussoorie Meals', image: '/images/food2.jpg', description: 'Colonial comfort food',  rating: 4.2 },
    { name: 'Dehradun Dine', image: '/images/food3.jpg', description: 'Simple and satisfying', rating: 4.1 },
  ],
  'Punjab': [
    { name: 'Amritsar Haveli', image: '/images/food1.jpg', description: 'Butter chicken & parathas',  rating: 4.8 },
    { name: 'Patiala Platters', image: '/images/food2.jpg', description: 'Rich Punjabi thalis',  rating: 4.5 },
    { name: 'Ludhiana Lassi', image:'/images/food3.jpg', description: 'Snacks and drinks',  rating: 4.4 },
    { name: 'Chandigarh Chaat', image:'/images/food4.jpg', description: 'Street food galore', rating: 4.3 },
  ],
};

const Restaurants = () => {
  const { countryName } = useParams(); // here countryName = state name from URL
  const navigate = useNavigate();
  const restaurants = restaurantsData[countryName] || [];

  const handleViewMenu = (restaurantName) => {
    const encoded = encodeURIComponent(restaurantName);
    navigate(`/menu/${encoded}`);
  };

  return (
    <div className="restaurants-container">
      <h1 className="restaurants-title">Top Restaurants in {countryName}</h1>

      <div className="restaurant-grid">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
            <h3 className="restaurant-name">{restaurant.name}</h3>
            <p className="restaurant-description">{restaurant.description}</p>
            
            <p className="restaurant-rating">⭐ Rating: {restaurant.rating}</p>
            <button
              className="menu-button"
              onClick={() => handleViewMenu(restaurant.name)}
            >
              View Menu
            </button>
          </div>
        ))}
      </div>

      <button
        className="back-button"
        onClick={() => navigate(`/hotels/${countryName}`)}
      >
        Explore Hotels
      </button>
    </div>
  );
};

export default Restaurants;
