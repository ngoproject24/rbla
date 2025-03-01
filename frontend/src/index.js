import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { ThemeProvider } from "./Context/ThemeContext";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </WishlistProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
  
);
