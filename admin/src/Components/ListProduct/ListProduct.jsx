
import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/Cross_Icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products from the database
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      const data = await response.json();
      if (data.success) {
        setAllProducts(data.products);
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Remove a product by ID
  const removeProduct = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/removeproducts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Product removed successfully");
        fetchProducts(); // Refresh the product list
      } else {
        alert("Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-all_product">
        <hr />
        {allProducts.length > 0 ? (
          allProducts.map((product, index) => (
            <React.Fragment key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img
                  src={product.image}
                  alt={product.name}
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => removeProduct(product.id)}
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt="Remove"
                />
              </div>
              <hr />
            </React.Fragment>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;