import React, { useState, useEffect } from 'react';
import './Popular.css';

import data_product from '../Assets/data_product'; // Correct path to fallback data
import Item from './Item'; // Adjust the path to your Item component

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
        <button onClick={() => window.location.reload()}>Retry</button> {/* Optional Retry */}
      </div>
    );
  }

  return (
    <div className="popular">
      <h1>LATEST COLLECTION</h1>
      <hr />
      <div className="popular-item">
        {(newCollection.length > 0 ? newCollection : data_product).map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.images[0]}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};
