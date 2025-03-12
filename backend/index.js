const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
//const userRoutes = require('../routes/userRoutes');
const bcrypt = require("bcryptjs");
const UserCartWishlist = require('./models/UserCartWishlist');
const Product = require('./models/ProductS');
//const Category = require('./models/Category');
const Order = require('./models/Order');
const Users = require('./models/Users');
app.use(express.json());
app.use(cors());
/*
In your backend (Express setup)
const adminOrderRoutes = require('./routes/admin/ordersa'); 
app.use('/admin/orders', adminOrderRoutes);
const salesReportRouter = require('./routes/admin/report'); 
app.use('/report', salesReportRouter); */
// Middleware
app.use(express.json());
app.use(cors());

// Root Endpoint
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Start Server
app.listen(port, (error) => {
    if (!error) {
        console.log("Running on Port", port);
    } else {
        console.log("Error:", error);
    }
});

// Ensure upload directory exists
const dir = './upload/images';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// MongoDB connection
mongoose.connect("mongodb+srv://sivaranjanianbazhagan2003:ngo2024@cluster0.hr2b0.mongodb.net/NGO", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

//

// Routes

const addressRoutes = require('./routes/address');
app.use('/api/address', addressRoutes);
// Signup Route
app.post('/signup', async (req, res) => {
    try {
      if (!req.body.name) {
        return res.status(400).json({ success: false, message: "Name is required" });
      }
  
      let check = await Users.findOne({ email: req.body.email });
      if (check) {
        return res.status(400).json({ success: false, message: "User with the same email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const lastUser = await Users.findOne().sort({ userid: -1 }); // Sort by descending userid to get the latest user
      const newUserId = lastUser ? lastUser.userid + 1 : 1;
      const user = new Users({
        userid :newUserId,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        // Cart and wishlist should be empty on user signup by default
        cartData: [],
        wishlistData: []
      });
  
      await user.save();
  
      const token = jwt.sign({ user: { id: user.id } }, 'secret-ecom');
      res.json({ success: true, token });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  });
  

// Login
app.post('/login', async (req, res) => {
    try {
        // Find the user by email
        let user = await Users.findOne({ email: req.body.email });
        
        if (user) {
            // Compare the provided password with the stored hashed password
            const passCompare = await bcrypt.compare(req.body.password, user.password);
            
            if (passCompare) {
                // Generate a JWT token and include the user role in the payload
                const token = jwt.sign({ user: { id: user.id, role: user.role } }, 'secret-ecom', { expiresIn: '1h' });

                // Set the redirection URL based on the user role
                let redirectUrl = '';

                if (user.role === 'admin') {
                    redirectUrl = '/admin';  // Admin role redirects to the add product page
                } else if (user.role === 'user') {
                    redirectUrl = '/';  // Regular user redirects to the home page
                } else if (user.role === 'vendor') {
                    redirectUrl = '/anklets';  // Vendor role redirects to the anklets page
                }

                // Respond with the token, username, and the redirection URL
                res.json({
                    success: true,
                    token,
                    username: user.name,
                    redirectUrl,  // This field will be used by the frontend to determine where to redirect
                });
            } else {
                res.status(400).json({ success: false, message: "Wrong password" });
            }
        } else {
            res.status(400).json({ success: false, message: "Email not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

const authenticateToken = (req, res, next) => {
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
app.get('/api/account', authenticateToken, async (req, res) => {
    try {
        // Get user details from the database using the user ID from the decoded token
        const user = await Users.findById(req.user.id).populate('cartData.productId').populate('wishlistData.productId').exec();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prepare the user data to be sent to the frontend
        const userData = {
            name: user.name,
            email: user.email,
            country: user.country || '',  // Ensure fallback value for country
            addresses: user.addresses || [],  // Fallback to empty array if no addresses
            orders: user.orders || [],  // Include orders if present
            cartData: user.cartData.map(item => ({
                productId: item.productId,  // Full product details can be included
                quantity: item.quantity,
            })) || [],  // Fallback to empty array if no cart items
            wishlistData: user.wishlistData.map(item => ({
                productId: item.productId,  // Full product details can be included
            })) || [],  // Fallback to empty array if no wishlist items
        };

        res.json(userData);  // Respond with the user data

    } catch (error) {
        console.error("Error fetching account details:", error);
        res.status(500).json({ message: 'Error fetching account details' });
    }
});
// Multer Storage for Image Uploads
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        const uniqueName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
    
});

const upload = multer({ storage: storage });

// Serve Static Files
app.use('/images', express.static('upload/images'));

// Upload Endpoint
app.post("/upload", upload.array('image', 10), (req, res) => {  // Handle multiple images
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: 0, message: 'No files uploaded' });
    }
    
    const imageUrls = req.files.map(file => `http://localhost:${port}/images/${file.filename}`);
    res.json({
        success: 1,
        image_urls: imageUrls,
    });
});
app.use(express.json()); // Add this line if it's missing
// Add Product

app.post('/addproduct', async (req, res) => {
    console.log(req.body); // Log the incoming request body

    try {
        // Get the last product and calculate the next productid
        const products = await Product.find({}).sort({ productid: -1 }).limit(1);
        const productid = products.length > 0 ? parseInt(products[products.length - 1].productid, 10) + 1 : 1;

        if (!req.body.name || !req.body.images || !req.body.category || !req.body.new_price || !req.body.old_price) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        console.log(productid); // Log the generated productid for debugging

        // Prepare the product data
        const productData = {
            productid: productid, // Use the correct productid here
            name: req.body.name,
            description: req.body.description,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            stock: req.body.stock,
            category: req.body.category,
            images: req.body.images,
        };

        // Create a new product instance
        const product = new Product(productData);

        // Save the product to the database
        await product.save();
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            res.status(400).json({
                success: false,
                message: "Duplicate product ID or name exists",
                error: error.message,
            });
        } else {
            // Handle other errors
            res.status(500).json({
                success: false,
                message: "Error saving product",
                error: error.message,
            });
        }
    }
});

  
// Remove Product
app.post('/removeproducts', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Error removing product", error: error.message });
    }
});
/*
// Get All Products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All Products fetched");
        res.json({ success: true, products: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
    }
});*/
// Get All Product
        // Map over the products to include the first image in the response
        app.get('/allproducts', async (req, res) => {
            try {
                let products = await Product.find({});
                
                // Add firstImage dynamically for each product
                products = products.map(product => ({
                    ...product._doc, // Spread the original product object
                    firstImage: product.images && product.images.length > 0 ? product.images[0] : null
                }));
        
                console.log("All Products fetched");
                res.json({ success: true, products: products });
            } catch (error) {
                console.error("Error fetching products:", error);
                res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
            }
        });
        app.get('/bedsheets', async (req, res) => {
            try {
                const bedsheets = await Product.find({ category: 'bedsheets' });
                if (bedsheets.length === 0) {
                    return res.status(404).json({ success: false, message: 'No bedsheets found' });
                }
                res.json({ success: true, data: bedsheets });
                console.log("Fetching bedsheets...");
                console.log("bedsheets found:", bedsheets);
            } catch (error) {
                console.error('Error fetching bedsheets:', error);
                res.status(500).json({ success: false, message: 'Failed to fetch bedsheets', error: error.message });
            }
            
        });
        app.get('/bamboo', async (req, res) => {
            try {
                const bamboo = await Product.find({ category: 'bamboo' });
                if (bamboo.length === 0) {
                    return res.status(404).json({ success: false, message: 'No bamboo found' });
                }
                res.json({ success: true, data: bamboo });
                console.log("Fetching bamboo...");
                console.log("bamboo found:", bamboo);
            } catch (error) {
                console.error('Error fetching bamboo:', error);
                res.status(500).json({ success: false, message: 'Failed to fetch bamboo', error: error.message });
            }
            
        });
        app.get('/bags', async (req, res) => {
            try {
                const bags = await Product.find({ category: 'bags' });
                if (bags.length === 0) {
                    return res.status(404).json({ success: false, message: 'No bags found' });
                }
                res.json({ success: true, data: bags });
                console.log("Fetching bags...");
                console.log("bags found:", bags);
            } catch (error) {
                console.error('Error fetching bags:', error);
                res.status(500).json({ success: false, message: 'Failed to fetch bags', error: error.message });
            }
            
        }); app.get('/bags', async (req, res) => {
            try {
                const bags = await Product.find({ category: 'bags' });
                if (bags.length === 0) {
                    return res.status(404).json({ success: false, message: 'No bags found' });
                }
                res.json({ success: true, data: bags });
                console.log("Fetching bags...");
                console.log("bags found:", bags);
            } catch (error) {
                console.error('Error fetching bags:', error);
                res.status(500).json({ success: false, message: 'Failed to fetch bags', error: error.message });
            }
            
        });
        app.get('/paperfiles', async (req, res) => {
            try {
                const paperfiles = await Product.find({ category: 'paperfiles' });
                if (paperfiles.length === 0) {
                    return res.status(404).json({ success: false, message: 'No paperfiles found' });
                }
                res.json({ success: true, data: paperfiles });
                console.log("Fetching paperfiles...");
                console.log("paperfiles found:", paperfiles);
            } catch (error) {
                console.error('Error fetching paperfiles:', error);
                res.status(500).json({ success: false, message: 'Failed to fetch paperfiles', error: error.message });
            }
            
        });
        app.get('/towels', async (req, res) => {
            try {
                const towels = await Product.find({ category: 'towels' });
                if (towels.length === 0) {
                    return res.status(404).json({ success: false, message: 'No towels found' });
                }
                res.json({ success: true, data: towels });
                console.log("Fetching paperfiles...");
                console.log("towels found:", towels);
            } catch (error) {
                console.error('Error fetching towels:', error);
                res.status(500).json({ success: false, message: 'Failed to fetch towels', error: error.message });
            }
            
        });
        app.get('/newcollections', async (req, res) => {
            try {
                const newCollection = await Product.find({})
                    .sort({ date: -1 }) // Sort by most recent first
                    .limit(6); // Get the 6 most recent products
                console.log("New Collection Fetched");
                res.json(newCollection);
            } catch (error) {
                console.error("Error fetching new collections:", error);
                res.status(500).send({ success: false, message: "Error fetching new collections" });
            }
        });
        app.get('/products/:id', async (req, res) => {
            const { id } = req.params;  // Access 'id' from the URL parameter
            console.log('Received productid:', id);  // Log the received ID
        
            try {
                // Attempt to search for product by matching the productid (either number or string)
                const product = await Product.findOne({
                    $or: [
                        { productid: parseInt(id) },  // Search if productid is a number
                        { productid: id }             // Search if productid is a string
                    ]
                });
        
                if (!product) {
                    return res.status(404).json({ success: false, message: "Product not found." });
                }
        
                res.status(200).json(product);
            } catch (error) {
                res.status(500).json({ success: false, message: "Server error: " + error.message });
            }
        });
        const Tok = (req, res, next) => {
            const token = req.header('Authorization')?.split(' ')[1];
            console.log('Token:', token);  // Log the token to check its value
            
            if (!token) {
                return res.status(401).json({ message: 'Access Denied, No Token Provided' });
            }
        
            try {
                const decoded = jwt.verify(token, 'secret-ecom');  // Verify the token using the secret key
                req.user = decoded.user;  // Attach the user information (including userId) to the request
                
                next();  // Proceed to the next middleware or route handler
            } catch (error) {
                return res.status(403).json({ message: 'Invalid Token' });
            }
        };
        app.get('/wishlist/get', authenticateToken, async (req, res) => {
            try {
              const userId = req.user.id;  // Get user ID from JWT token
              const cart = await UserCartWishlist.findOne({ userid: userId });
          
              if (!cart) {
                return res.status(404).json({ message: "Wishlist not found." });
              }
          
              // Only return items with isInCart = true
              const itemsInCart = cart.items.filter(item => item.isInCart === false);
              res.json({ items: itemsInCart });
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: "Error fetching cart." });
            }
          }); 
          app.post('/wishlist/remove', authenticateToken, async (req, res) => {
            try {
              const { productid } = req.body;  // Product ID is a number now
              const userid = req.user.id;
              console.log('User ID:', userid);
              console.log('Product ID:', productid);  // Ensure productid is a number
          
              // Find the product by productid
              const product = await Product.findOne({ productid: productid });
          
              if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
              }
          
              const cart = await UserCartWishlist.findOne({ userid });
              
              if (!cart) {
                return res.status(404).json({ success: false, message: 'Cart not found for this user' });
              }
          
              console.log('Current Cart:', cart);
          
              const productInCart = cart.items.find(item => item.productid === productid && item.isInCart === false);
          
              if (!productInCart) {
                return res.status(404).json({ success: false, message: 'Product not found in wishlist' });
              }
          
              const result = await UserCartWishlist.updateOne(
                { 
                  userid, 
                  'items.productid': productid,
                  'items.isInCart': false // Ensure only wishlist items are removed
                },
                {
                  $pull: { 
                    items: { productid: productid, isInCart: false }
                  },
                }
              );
          
              if (result.modifiedCount === 0) {
                return res.status(404).json({ success: false, message: 'Product not removed from wishlist' });
              }
          
              res.status(200).json({ success: true, message: 'Product removed from wishlist' });
            } catch (error) {
              console.error('Error removing product from wishlist:', error);
              res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
            }
          });
        
  app.post('/wishlist/add', authenticateToken, async (req, res) => {
    try {
      const { productid, productName, images,new_price } = req.body; 
      const userid = req.user.id; 
      console.log(productid);
      console.log("UserID:",userid);
  
      const product = await Product.findOne({ productid: productid });
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      const productObjectId = product._id;
      console.log(productObjectId);
  
      const result = await UserCartWishlist.updateOne(
        { userid },
        {
          $addToSet: {  // Ensure product is added only once
            items: {
              productid: productid,
              productName: productName,  // Store productName
              new_price: new_price,  
              images:images,    // Store new_price
              isInCart: false,
            },
          },
        },
        { upsert: true } // If no matching document is found, create a new one
      );
  
      res.status(200).json({ success: true, message: 'Product added to Wishlist', result });
  
    } catch (error) {
      console.error('Error adding product to Wishlist:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  });
  app.post('/cart/add', authenticateToken, async (req, res) => {
    try {
      const { productid, quantity,productName,new_price ,images} = req.body;
      const userid = req.user.id; 
      console.log(userid);
      console.log(req.body);
      const product = await Product.findOne({ productid: productid });
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      // Now you have the ObjectId of the product
     // const productObjectId = product._id;
  //console.log(productObjectId);
      // Proceed to add the product to the cart using the product's ObjectId
      const result = await UserCartWishlist.updateOne(
        { userid },
        {
          $addToSet: { // This ensures that the product is added only once
            items: {
              productid: productid,
              productName: productName,  // Store productName
              new_price: new_price,  
              quantity: quantity,
              images:images,
              isInCart: true,
            },
          },
        },
        { upsert: true }
      );
      
  
      res.status(200).json({ success: true, message: 'Product added to cart', result });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  });
  
  app.post('/cart/remove', authenticateToken, async (req, res) => {
    try {
      const { productid } = req.body;  // Product ID is a number now
      const userid = req.user.id;
      console.log('User ID:', userid);
      console.log('Product ID:', productid);  // Ensure productid is a number
  
      // Find the product by productid
      const product = await Product.findOne({ productid: productid });
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      const cart = await UserCartWishlist.findOne({ userid });
      
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found for this user' });
      }
  
      console.log('Current Cart:', cart);
  
      const productInCart = cart.items.find(item => item.productid === productid && item.isInCart === true);
  
      if (!productInCart) {
        return res.status(404).json({ success: false, message: 'Product not found in Cart' });
      }
  
      const result = await UserCartWishlist.updateOne(
        { 
          userid, 
          'items.productid': productid,
          'items.isInCart': true // Ensure only wishlist items are removed
        },
        {
          $pull: { 
            items: { productid: productid, isInCart: true }
          },
        }
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({ success: false, message: 'Product not removed from wishlist' });
      }
  
      res.status(200).json({ success: true, message: 'Product removed from wishlist' });
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  });
  app.post('/cart/update', authenticateToken, async (req, res) => {
    const { productid, quantity } = req.body;
    try {
      const userId = req.user.id;  
      console.log("User ID:", userId);
      const userCart = await UserCartWishlist.findOne({ userid: userId });
  
      if (!userCart) {
        return res.status(404).json({ message: "User cart not found" });
      }
  
      const cartItem = userCart.items.find(item => item.productid === productid && item.isInCart === true);
  
      if (!cartItem) {
        return res.status(404).json({ message: "Item not found in cart with isInCart set to true" });
      }
  
      cartItem.quantity = quantity;
  
      await userCart.save();
      
      res.json({ message: "Cart updated successfully", updatedCart: userCart });
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ message: "Failed to update cart" });
    }
  });
app.get('/cart/get', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;  // Get user ID from JWT token
      const cart = await UserCartWishlist.findOne({ userid: userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Wishlist not found." });
      }
  
      // Only return items with isInCart = true
      const itemsInCart = cart.items.filter(item => item.isInCart === true);
      res.json({ items: itemsInCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching cart." });
    }
  });
  // POST Search API endpoint
app.post('/search', async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Perform a case-insensitive search for products by name
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },     // Search in 'name' field
        { description: { $regex: query, $options: 'i' } }, // Search in 'description' field
        { category: { $regex: query, $options: 'i' } }    // Search in 'category' field
      ]
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});