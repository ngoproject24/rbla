import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

import T1_img from '../Components/Assets/T1.png';
import T2_img from '../Components/Assets/T2.png';
import T3_img from '../Components/Assets/T3.png';
import T4_img from '../Components/Assets/T4.png';
import T5_img from '../Components/Assets/T5.png';
import tt_img from '../Components/Assets/tt.png';
import wt_img from '../Components/Assets/wt.png';


const towels = [
  {
    id: 1,
    name: 'Rose printed towel',
    images: [T1_img, T2_img, T3_img, T4_img, T5_img],
    new_price: 130.0,
    old_price: 80.0,
  },
  {
    id: 2,
    name: 'Blue leaf towel',
    images: [T2_img, T3_img, T4_img, T5_img, T1_img],
    new_price: 130.0,
    old_price: 80.0,
  },
  {
    id: 3,
    name: 'Brown cotton towel',
    images: [T3_img, T4_img, T5_img, T1_img, T2_img],
    new_price: 130.0,
    old_price: 80.0,
  },
  {
    id: 4,
    name: 'Multi circle cotton towel',
    images: [T4_img, T5_img, T1_img, T2_img, T3_img],
    new_price: 130.0,
    old_price: 80.0,
  },
  {
    id: 5,
    name: 'Baby penguin towel',
    images: [T5_img, T1_img, T2_img, wt_img, tt_img],
    new_price: 130.0,
    old_price: 80.0,
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = towels.find((towel) => towel.id === parseInt(id));

  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('2.5 x 5');
  const [printedSide, setPrintedSide] = useState('Single Side');

  const calculateTotalPrice = () => {
    const basePrice = product.new_price;
    const sizeMultiplier = size === '2.5 x 5' ? 1 : size === '3 x 6' ? 1.2 : 1.5; // Example multipliers
    const sideMultiplier = printedSide === 'Single Side' ? 1 : 1.5;
    return (basePrice * sizeMultiplier * sideMultiplier * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    console.log(`Added ${product.name} to cart with quantity ${quantity}`);
    navigate('/cart');
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details">
      <div className="image-gallery">
        <div className="main-image-container">
          <img src={mainImage} alt={product.name} className="main-image" />
        </div>
        <div className="thumbnails">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
              onClick={() => setMainImage(image)}
              role="button"
              aria-label={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>

        <div className="price-calculator">
          <h2>Price Calculator</h2>
          <div className="calculator-row">
            <label>Size (W x H):</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="2.5 x 5">Ft (2.5 x 5)</option>
              <option value="3 x 6">Ft (3 x 6)</option>
              <option value="4 x 8">Ft (4 x 8)</option>
            </select>
          </div>
          <div className="calculator-row">
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>
          <div className="calculator-row">
            <label>Printed Side:</label>
            <select value={printedSide} onChange={(e) => setPrintedSide(e.target.value)}>
              <option value="Single Side">Single Side</option>
              <option value="Double Side">Double Side</option>
            </select>
          </div>
          <div className="calculator-row">
            <strong>Total (Incl. of all Taxes):</strong>
            <span>₹ {calculateTotalPrice()}</span>
          </div>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        {/* New Design Steps Section */}
        <div className="design-steps">
          <h3>Next Step for Design</h3>
          <div className="design-options">
            <div
              className="design-option"
              onClick={() => navigate('/browse-design')}
              role="button"
              aria-label="Browse Design"
            >
              Browse Design →
            </div>
            <div
              className="design-option"
              onClick={() => navigate('/CustomDesignPage')}
              role="button"
              aria-label="Custom Design"
            >
              Custom Design →
            </div>
            <div
              className="design-option"
              onClick={() => navigate('/UploadDesignAndCheckout')}
              role="button"
              aria-label="Upload Design and Checkout"
            >
              Upload Design and Checkout →
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetails;
