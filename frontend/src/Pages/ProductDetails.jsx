import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetail = () => {
  const { id } = useParams();
  const productId = Number(id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [category, setCategory] = useState("Adult"); // Default category
  const [setOption, setSetOption] = useState("Single"); // Default set
  const [quantity, setQuantity] = useState(1);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/products/${productId}`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();

        setMainImage(data.images?.length ? data.images[0] : "default-image-url");
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!product) return "0.00";
    const basePrice = product.new_price || 0;
    const categoryMultiplier = category === "Adult" ? 1 : 0.8;
    const setMultiplier = setOption === "Single" ? 1 : 2;
    return (basePrice * categoryMultiplier * setMultiplier * quantity).toFixed(2);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found!</div>;

  return (
    <div className="product-details">
      {/* Left Section - Image Gallery */}
      <div className="image-gallery">
        <div className="main-image-container">
          <img src={mainImage} alt={product.name} className="main-image" />
        </div>
        
      </div>

      {/* Right Section - Product Info */}
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">
          <strong>₹{product.new_price.toFixed(2)}</strong>
          <span className="old-price">₹{product.old_price.toFixed(2)}</span>
          <span className="discount">
            (Save {((1 - product.new_price / product.old_price) * 100).toFixed(0)}%)
          </span>
        </p>
        <p className="description">
          <strong>Description:</strong> {product.description}
        </p>

        {/* Category Selector */}
        <div className="category">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Adult">Adult</option>
            <option value="Child">Child</option>
          </select>
        </div>

        {/* Set Selector */}
        <div className="set">
          <label>Set:</label>
          <select value={setOption} onChange={(e) => setSetOption(e.target.value)}>
            <option value="Single">Single</option>
            <option value="Pair">Pair</option>
          </select>
        </div>

        {/* Quantity Selector */}
        <div className="quantity">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            min="1"
          />
        </div>

        {/* Total Price */}
        <div className="total-price">
          <strong>Total Price (Incl. of all Taxes):</strong>
          <span>₹ {calculateTotalPrice()}</span>
        </div>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn">Add To Cart</button>

        {/* Offers Section */}
        <div className="offers">
          <p>Save extra with below offers:</p>
          <ul>
            <li className="offer-item">5% off on card payment</li>
            <li className="offer-item">10% off on UPI payment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
