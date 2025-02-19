import React, { useContext,useEffect} from 'react';
//import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import './Cart.css';
import closeIcon from '../Components/Assets/close.png';

const Cart = () => {
  const { cart, cartCount, removeItem,fetchCart} = useContext(CartContext);
  useEffect(() => {
    fetchCart();  // Call fetchCart to get cart data when the component mounts
  }, []);  // Dependency array to ensure it re-runs when needed
/*
  // Function to increment item quantity using updateQuantity from context
  const incrementQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    updateQuantity(item.productid, newQuantity);  // Update via the context
  };

 
  const decrementQuantity = (item) => {
    const newQuantity = item.quantity > 1 ? item.quantity - 1 : 0; 
    if (newQuantity === 0) {
      removeItem(item.productid);
    } else {
      updateQuantity(item.productid, newQuantity);
    }
  };
 
  // Calculate total
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.new_price * item.quantity, 0); */

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <h2>Total Items: {cartCount}</h2>

      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">Price: ${item.new_price}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeItem(item)}
              >
                <img src={closeIcon} alt="Remove" className="close-icon" />
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
       
      </div>
    </div>
    
  );
};

export default Cart;
