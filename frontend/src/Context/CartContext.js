/*import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token")); // Track token in state

  // Add event listener for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("auth_token");
      setToken(newToken);
      if (!newToken) setCart([]); // Clear cart when token is removed
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Fetch cart when token changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/cart/get", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setCart(data.items || []);
        }
      } catch (err) {
        console.error("Fetch cart error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  // Always get fresh token for API calls
  const getAuthHeader = () => {
    const currentToken = localStorage.getItem("auth_token");
    return { "Authorization": `Bearer ${currentToken}` };
  };

  const addToCart = async (item) => {
    const currentToken = localStorage.getItem("auth_token");
    if (!currentToken) {
      alert("Please login to add items to cart");
      return;
    }

    setLoading(true);
    try {
      // Fixed endpoint URL (removed typo)
      const response = await fetch("http://localhost:4000/cartss/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({
          productid: item.productid,
          quantity: 1,
          images: item.images,
          productName: item.productName,
          new_price: item.new_price,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.updatedCart);
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Similar fixes for removeItem and updateQuantity functions
  const removeItem = async (productid) => {
    const currentToken = localStorage.getItem("auth_token");
    if (!currentToken) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/cartss/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({ productid }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.updatedCart);
      }
    } catch (err) {
      console.error("Remove item error:", err);
    } finally {
      setLoading(false);
    }
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeItem,
        cartCount,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};*/
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasToken, setHasToken] = useState(false);

  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (token) {
      setHasToken(true);
      fetchCart();
    } else {
      setHasToken(false);
    }
  }, [token]);

  // Fetch cart items
  const fetchCart = async () => {
    if (!hasToken) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/cart/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text(); // Get raw response
      let data;
      try {
        data = JSON.parse(text); // Try parsing JSON
      } catch (err) {
        console.error("Invalid JSON response:", text);
        throw new Error("Invalid response from server");
      }

      if (response.ok) {
        setCart(data.items || []);
      } else {
        setError(data.message || "Error fetching cart.");
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (item) => {
    if (!hasToken) {
      alert("No token found. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/cart/add", {  // Ensure this endpoint exists
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productid: item.productid,
          quantity: 1,
          images: item.images,
          productName: item.productName,
          new_price: item.new_price,
        }),
      });

      const text = await response.text(); // Handle raw response
      let data;
      try {
        data = JSON.parse(text); 
      } catch (err) {
        console.error("Invalid JSON response:", text);
        throw new Error("Invalid response from server");
      }

      if (response.ok) {
        alert(`${item.productName} added to cart!`);
        setCart((prevCart) => [...(prevCart || []), { ...item, quantity: 1 }]);
      } else {
        setError(data.message || "Error adding product to cart.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (item) => {
    if (!hasToken) {
      alert("No token found. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/cart/remove", { // Verify this endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productid: item.productid }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Invalid JSON response:", text);
        throw new Error("Invalid response from server");
      }

      if (response.ok) {
        alert("Item removed from cart.");
        setCart((prevCart) => prevCart.filter((i) => i.productid !== item.productid));
      } else {
        setError(data.message || "Error removing product from cart.");
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update quantity of item
  const updateQuantity = async (productid, newQuantity) => {
    if (!hasToken) {
      alert("No token found. Please log in.");
      return;
    }

    if (newQuantity <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/cart/update", { // Verify this endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productid, quantity: newQuantity }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Invalid JSON response:", text);
        throw new Error("Invalid response from server");
      }

      if (response.ok) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.productid === productid ? { ...item, quantity: newQuantity } : item
          )
        );
        alert("Cart updated successfully.");
      } else {
        setError(data.message || "Error updating cart.");
      }
    } catch (err) {
      console.error("Error updating cart:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total items count
  const cartCount = (cart || []).reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeItem,
        fetchCart,
        cartCount,
        loading,
        error,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
