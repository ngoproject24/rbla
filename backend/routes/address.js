const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Order = require('../models/Order');  
const UserCartWishlist = require('../models/UserCartWishlist');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Get token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access Denied, No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secret-ecom');  // Decode the token
        console.log('Decoded Token:', decoded);  // Log the decoded token to check expiration

        req.user = decoded.user;  // Attach user data to the request object
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid Token' });
    }
};

router.put('/add-address', authMiddleware, async (req, res) => {
  try {
    const { street, landmark, city, pincode, state, phone } = req.body;
    const userId = req.user.id;

    console.log("Received Address Data:", req.body);

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure user.address is a valid array of objects
    if (!Array.isArray(user.address)) {
      user.address = []; // Initialize as empty array if not an array
    } else {
      // Filter out any non-object elements (e.g., strings, null, arrays)
      user.address = user.address.filter(addr => 
        addr !== null && typeof addr === 'object' && !Array.isArray(addr)
      );
    }

    const newAddress = {
      street,
      landmark: landmark || "",
      city,
      pincode,
      state,
      phone: phone || "",
    };

    user.address.push(newAddress);

    console.log("Updated User Address:", user.address);

    const updatedUser = await user.save();
    res.status(200).json({
      message: 'Address added successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: 'Something went wrong, please try again later' });
  }
});


// Update address route
router.put('/update-address/:addressId', authMiddleware, async (req, res) => {
  try {
    const { street, landmark, city, pincode, country, phone } = req.body;
    const userId = req.user.id;
    const { addressId } = req.params;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addressIndex = user.address.findIndex(address => address._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    user.address[addressIndex] = {
      ...user.address[addressIndex],
      street,
      landmark,  
      city,
      pincode,  
      country,
      phone
    };

    const updatedUser = await user.save();
    res.status(200).json({
      message: 'Address updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong, please try again later' });
  }
});


router.get('/account', authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      addresses: user.address, 
    });
  } catch (error) {
    console.error("Error fetching account details:", error);
    res.status(500).json({ message: 'Error fetching account details' });
  }
});

router.delete('/delete-address/:addressId', authMiddleware, async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.user.id;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    user.address = user.address.filter(address => address._id.toString() !== addressId);
    await user.save();

    res.status(200).json({
      message: 'Address deleted successfully',
      user: user,  // Send the updated user object with the addresses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong, please try again later' });
  }
});



router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 

  
    const orders = await Order.find({ userid: userId }).populate('items.productid').exec(); 

    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

  
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Error fetching orders.' });
  }
});

module.exports = router;