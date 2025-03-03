import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.png";
import Sidebar from "../Sidebar/Sidebar";

const AddProduct = () => {
  // State for product details
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "blockprinting",
    price: "",
    discount: "",
    stock: "",
    sku: "",
    description: "",
  });

  // State for images
  const [images, setImages] = useState([]);

  // Handle input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle image upload
  const imageHandler = (e) => {
    setImages([...e.target.files]);
  };

  // Handle form submission
  const Add_Product = () => {
    console.log("Product Details:", productDetails);
    console.log("Uploaded Images:", images);
    alert("Product added successfully!");
    // You can add API integration here to submit data
  };

  return (
    <div className="add-product-container">
      <Sidebar />
      <div className="add-product-form">
        <h1 className="form-title">Add New Product</h1>

        <form
          className="product-form"
          onSubmit={(e) => {
            e.preventDefault();
            Add_Product();
          }}
        >
          <div className="form-grid">
            {/* Product Name */}
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                value={productDetails.name}
                onChange={changeHandler}
                type="text"
                name="name"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={productDetails.category}
                onChange={changeHandler}
                name="category"
                className="form-select"
              >
                <option value="blockprinting">Block Printing</option>
                <option value="cupcoaster">Cup Coaster</option>
                <option value="paperfiles">Paper Files</option>
                <option value="bamboo">Bamboo Products</option>
              </select>
            </div>

            {/* Price and Discount */}
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                value={productDetails.price}
                onChange={changeHandler}
                type="number"
                name="price"
                placeholder="Enter price"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount (%)</label>
              <input
                id="discount"
                value={productDetails.discount}
                onChange={changeHandler}
                type="number"
                name="discount"
                placeholder="Enter discount"
                min="0"
                max="100"
              />
            </div>

            {/* Stock Quantity */}
            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                id="stock"
                value={productDetails.stock}
                onChange={changeHandler}
                type="number"
                name="stock"
                placeholder="Enter stock quantity"
                required
              />
            </div>

            {/* SKU */}
            <div className="form-group">
              <label htmlFor="sku">SKU/ID</label>
              <input
                id="sku"
                value={productDetails.sku}
                onChange={changeHandler}
                type="text"
                name="sku"
                placeholder="Enter product SKU"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={productDetails.description}
                onChange={changeHandler}
                name="description"
                placeholder="Enter product description"
                rows="4"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="form-group full-width image-upload">
              <label htmlFor="file-input">Product Images</label>
              <div className="upload-container">
                <label htmlFor="file-input" className="upload-area">
                  <img
                    src={images.length > 0 ? URL.createObjectURL(images[0]) : upload_area}
                    className="upload-preview"
                    alt="Upload preview"
                  />
                  <div className="upload-overlay">
                    <p>{images.length > 0 ? `${images.length} files selected` : "Click to upload"}</p>
                    <span>Drag & drop or click to choose files</span>
                  </div>
                </label>
                <input
                  onChange={imageHandler}
                  type="file"
                  name="images"
                  id="file-input"
                  multiple
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
