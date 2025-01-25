import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../Assets/upload_area.png'; // Ensure the path is correct

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "blockprinting",
    price: "",
    stock: "",
    description: "",
    sku: "",
    tags: "",
    discount: "",
  });

  const imageHandler = (e) => {
    setImages([...e.target.files]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    images.forEach((image) => formData.append('product_images', image));

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data });

    if (responseData?.success) {
      product.images = responseData.image_urls;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data?.success ? alert("Product Added Successfully") : alert("Product Addition Failed");
      });
    }
  };

  return (
    <div className="add-product">
      <h1 className="add-product-title">Add New Product</h1>
      
      {/* Product Name */}
      <div className="addproduct-itemfield">
        <p>Product Name</p>
        <input 
          value={productDetails.name} 
          onChange={changeHandler} 
          type="text" 
          name="name" 
          placeholder="Enter product name" 
        />
      </div>

      {/* Category */}
      <div className="addproduct-itemfield">
        <p>Category</p>
        <select 
          value={productDetails.category} 
          onChange={changeHandler} 
          name="category" 
          className="add-product-selector">
          <option value="blockprinting">Block Printing</option>
          <option value="cupcoaster">Cup Coaster</option>
          <option value="paperfiles">Paper Files</option>
          <option value="bamboo">Bamboo Products</option>
        </select>
      </div>

      {/* Price and Discount */}
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input 
            value={productDetails.price} 
            onChange={changeHandler} 
            type="number" 
            name="price" 
            placeholder="Enter price" 
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Discount (%)</p>
          <input 
            value={productDetails.discount} 
            onChange={changeHandler} 
            type="number" 
            name="discount" 
            placeholder="Enter discount percentage" 
          />
        </div>
      </div>

      {/* Stock Quantity */}
      <div className="addproduct-itemfield">
        <p>Stock Quantity</p>
        <input 
          value={productDetails.stock} 
          onChange={changeHandler} 
          type="number" 
          name="stock" 
          placeholder="Enter stock quantity" 
        />
      </div>

      {/* SKU */}
      <div className="addproduct-itemfield">
        <p>SKU/ID</p>
        <input 
          value={productDetails.sku} 
          onChange={changeHandler} 
          type="text" 
          name="sku" 
          placeholder="Enter product SKU or ID" 
        />
      </div>

      {/* Description */}
      <div className="addproduct-itemfield">
        <p>Description</p>
        <textarea 
          value={productDetails.description} 
          onChange={changeHandler} 
          name="description" 
          placeholder="Enter product description" 
          rows="4"
        />
      </div>

      {/* Images */}
      <div className="addproduct-itemfield">
        <label htmlFor="file-input" className="file-input-label">
          <img 
            src={images.length > 0 ? URL.createObjectURL(images[0]) : upload_area} 
            className="addproduct-thumbnail-img" 
            alt="Upload Thumbnail" 
          />
        </label>
        <input 
          onChange={imageHandler} 
          type="file" 
          name="images" 
          id="file-input" 
          hidden 
          multiple 
        />
      </div>

      {/* Submit Button */}
      <button onClick={Add_Product} className="addproduct-btn">Add Product</button>
    </div>
  );
};

export default AddProduct;
