import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';

const ListProduct = () => {
  const [all_product, setAllProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'blockprinting',
    old_price: '',
    new_price: '',
    stock: '',
    description: '',
    images: []
  });

  // Fetch all products
  const fetchInfo = async () => {
    const response = await fetch('http://localhost:4000/all_product');
    const data = await response.json();
    setAllProduct(data);
  };

  useEffect(() => { fetchInfo(); }, []);

  // Product Actions
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      await fetchInfo();
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setFormData(product);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const url = editMode ? 'http://localhost:4000/updateproduct' : 'http://localhost:4000/addproduct';
    // Add your form submission logic here
    setShowModal(false);
    setEditMode(false);
    setFormData({...formData, images: []});
    await fetchInfo();
  };

  return (
    <div className="list-product-container">
      <Sidebar/>
      <div className="list-product">
        <div className="list-product-header">
          <h1>Product Management</h1>
          
        </div>

        <div className="product-table">
          <div className="table-header">
            <span>Product</span>
            <span>Title</span>
            <span>Old Price</span>
            <span>New Price</span>
            <span>Category</span>
            <span>Stock</span>
            <span>Actions</span>
          </div>

          <div className="table-body">
            {all_product.map((product) => (
              <div key={product.id} className="table-row">
                <img src={product.image} alt={product.name} className="product-thumbnail"/>
                <span>{product.name}</span>
                <span>${product.old_price}</span>
                <span>${product.new_price}</span>
                <span>{product.category}</span>
                <span>{product.stock}</span>
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(product)}>
                    <FaEdit/>
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                    <FaTrash/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="product-modal">
              <h2>{editMode ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={submitProduct}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Old Price</label>
                    <input type="number" name="old_price" value={formData.old_price} onChange={handleInputChange}/>
                  </div>
                  <div className="form-group">
                    <label>New Price</label>
                    <input type="number" name="new_price" value={formData.new_price} onChange={handleInputChange} required/>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange}>
                      <option value="blockprinting">Block Printing</option>
                      <option value="cupcoaster">Cup Coaster</option>
                      <option value="paperfiles">Paper Files</option>
                      <option value="bamboo">Bamboo Products</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required/>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange}/>
                </div>

                <div className="form-group">
                  <label>Product Images</label>
                  <input type="file" multiple onChange={handleImageChange}/>
                </div>

                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => {
                    setShowModal(false);
                    setEditMode(false);
                  }}>Cancel</button>
                  <button type="submit" className="submit-btn">
                    {editMode ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;