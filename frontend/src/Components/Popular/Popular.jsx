import React, { useState, useEffect } from 'react';
import './Popular.css';

import data_product from '../Assets/data_product'; // Fallback data
import Item from './Item'; // Item component
import Footer from '../Footer/Footer';

export const Popular = () => {
  const [newCollection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setNewCollection(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching collections:', err);
        setError('Failed to load collections. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="popular">
        <h1>Loading...</h1>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="popular">
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <div className="popular">
        <h1>LATEST COLLECTION</h1>
        <hr />
        
        <div className="popular-items">
          {(newCollection.length > 0 ? newCollection : data_product).map((item, i) => (
            <div className="popular-item-card" key={i}>
              <img
                src={item.images?.[0] || 'https://via.placeholder.com/200'}
                alt={item.name}
                className="popular-item-image"
              />
              <h2 className="popular-item-name">{item.name}</h2>
              <div className="popular-item-prices">
                <span className="new-price">${item.new_price}</span>
                <span className="old-price">${item.old_price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
