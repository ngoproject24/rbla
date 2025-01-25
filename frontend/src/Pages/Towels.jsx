import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Towels.css';


// Import towel images
import T1_img from '../Components/Assets/T1.png';
import T2_img from '../Components/Assets/T2.png';
import T3_img from '../Components/Assets/T3.png';
import T4_img from '../Components/Assets/T4.png';
import T5_img from '../Components/Assets/T5.png';


// Define the towel data
const towels = [
  { id: 1, name: 'Rose printed towel', image: T1_img, new_price: 130.0, old_price: 80.0 },
  { id: 2, name: 'Blue leaf towel', image: T2_img, new_price: 130.0, old_price: 80.0 },
  { id: 3, name: 'Brown cotton towel', image: T3_img, new_price: 130.0, old_price: 80.0 },
  { id: 4, name: 'Multi circle cotton towel', image: T4_img, new_price: 130.0, old_price: 80.0 },
  { id: 5, name: 'Baby penguin towel', image: T5_img, new_price: 130.0, old_price: 80.0 },
];

const Towels = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <h1>Welcome to the Towels category page!</h1>
      <div className="container">
        {towels.map((towel) => (
          <div key={towel.id} className="towel-card">
            <div className="towel-image-container">
              <img
                className="towel-image"
                src={towel.image}
                alt={towel.name}
                onClick={() => navigate(`/towels/${towel.id}`)} // Navigate to Product Details
              />
            </div>
            <div className="towel-name">{towel.name}</div>
            <div className="towel-price">
              <span className="new-price">${towel.new_price}</span>{' '}
              <span className="old-price">${towel.old_price}</span>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Towels;
