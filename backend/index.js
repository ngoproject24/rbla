/*const port = 4000;
const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//mongoose.connect("mongodb+srv://sornapriyamvatha:%23Priya24@cluster0.ihjp2.mongodb.net/Ecom")
mongoose.connect("mongodb+srv://sivaranjanianbazhagan2003:chittu%4029@cluster0.wqw0r.mongodb.net/Ecom")


//API creation
app.get("/",(req,res)=>{
res.send("Express App is Running");
})


//Image storage engine
const storage = multer.diskStorage({
    destination : './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

    }
})

const upload = multer({storage:storage})

//creating upload endpoint for imgs
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
      res.json({
        sucess : 1 ,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
      })
})

//schema for products
const product = mongoose.model("product",{


id:{
       type:Number,
       required : true,
},
name:{
    type:String,
    required:true,
},
image:{
    type:String,
    required:true,
},
category:{
    type:String,
    required:true,

},
new_price:{
    type: Number,
    required: true,
},
old_price:{
    type: Number,
    required: true,
},
date:{
    type:Date,
    default:Date.now,
},
avilable:{
    type:Boolean,
    default:true,

},
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
    

});
console.log(product);
await product.save();
console.log("saved");
response.json({
    sucess:true,
    name:req.body.name,
})
})

//creating api for deleteing products
app.post('/removeproduct',async(req,res)=>{
 await Product.findOneAndDelete({id:req.body.id});
 console.log("removed");
 res.json({
    success:true,
    name:req.body.name
 })
 
})

//creating api for getting all products
app.get('/allproducts',async(req,res)=>{
let products = await Prouct.find({});
console.log("all products fetched");
res.send(products);
})


app.listen(port,(error)=>{
    if(!error){
        console.log("Running on Port "+port);
    }else{
        console.log("Error : "+error);
    }
    })*/
   /* const port = 4000;
    const express = require("express");
    const app = express();
    const mongoose = require("mongoose");
    const jwt = require("jsonwebtoken");
    const multer = require("multer");
    const path = require("path");
    const fs = require("fs");
    const cors = require("cors");
    const { log } = require("console");
    
    app.use(express.json());
    app.use(cors());
    
    // Ensure upload directory exists
    const dir = './upload/images';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    // MongoDB connection
    mongoose.connect("mongodb+srv://sivaranjanianbazhagan2003:chittu%4029@cluster0.wqw0r.mongodb.net/Ecom");
    
    // Product Schema
    const Product = mongoose.model("Product", {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        new_price: {
            type: Number,
            required: true,
        },
        old_price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        available: {
            type: Boolean,
            default: true,
        }
    });
    
    // POST endpoint to add product
    app.post('/addproduct', async (req, res) => {
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }
    
        // Check if all required fields are in the request body (excluding 'id')
        if (!req.body.name || !req.body.image || !req.body.category || !req.body.new_price || !req.body.old_price) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
    
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
    
        try {
            await product.save();
            res.json({
                success: true,
                name: req.body.name,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error saving product", error: error.message });
        }
    });
    //creating API for deleting product
    app.post('/removeproducts',async(req,res)=>{
        await Product.findOneAndDelete({id:req.body.id});
        console.log("Removed");
        res.json({
            sucess:true,
            name:req.body.name
        })  
    })
    //creating API for getting all products
    app.get('/allproducts', async (req, res) => {
        try {
            let products = await Product.find({});
            console.log("All Products fetched");
            res.json({
                success: true,
                products: products
            });
        } catch (error) {
            console.error("Error fetching products: ", error);
            res.status(500).json({
                success: false,
                message: "Error fetching products",
                error: error.message
            });
        }
    });
    
    // API root endpoint
    app.get("/", (req, res) => {
        res.send("Express App is Running");
    });
    
    // Start the server
    app.listen(port, (error) => {
        if (!error) {
            console.log("Running on Port ", port);
        } else {
            console.log("Error : ", error);
        }
    });
    
    // Multer storage engine
    const storage = multer.diskStorage({
        destination: './upload/images',
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
        }
    });
    
    const upload = multer({ storage: storage });
    
    // Serve static files from the upload directory
    app.use('/images', express.static('upload/images'));
    
    // Upload endpoint
    app.post("/upload", upload.single('product'), (req, res) => {
        console.log(req.file); // Debugging statement
        if (!req.file) {
            return res.status(400).json({ success: 0, message: 'No file uploaded or invalid field name' });
        }
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/images/${req.file.filename}`,
        });
    });*/
   /* const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Ensure upload directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// MongoDB connection
mongoose.connect("mongodb+srv://sivaranjanianbazhagan2003:chittu%4029@cluster0.wqw0r.mongodb.net/Ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Product Schema
const Product = mongoose.model("Product", {
    id: Number,
    name: String,
    image: String,
    category: String,
    new_price: Number,
    old_price: Number,
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

// Multer storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        const uniqueName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the upload directory
app.use('/images', express.static('upload/images'));

// Upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded or invalid field name' });
    }
    const imageUrl = `http://localhost:${port}/images/${req.file.filename}`;
    res.json({ success: true, image_url: imageUrl });
});

// Add product endpoint
app.post('/addproduct', async (req, res) => {
    try {
        const { name, image, category, new_price, old_price } = req.body;

        if (!name || !image || !category || !new_price || !old_price) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const products = await Product.find({});
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = new Product({
            id,
            name,
            image,
            category,
            new_price,
            old_price,
        });

        await newProduct.save();
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ success: false, message: "Error saving product", error: error.message });
    }
});

// API root endpoint
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});*/
const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Ensure upload directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// MongoDB connection
mongoose.connect("mongodb+srv://sivaranjanianbazhagan2003:chittu%4029@cluster0.wqw0r.mongodb.net/Ecom")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Product Schema
const Product = mongoose.model("Product", {
    id: Number,
    name: String,
    image: String,
    category: String,
    new_price: Number,
    old_price: Number,
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

// Multer storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        const uniqueName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the upload directory
app.use('/images', express.static('upload/images'));

// Upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded or invalid field name' });
    }
    const imageUrl = `http://localhost:${port}/images/${req.file.filename}`;
    res.json({ success: true, image_url: imageUrl });
});

// Add product endpoint
app.post('/addproduct', async (req, res) => {
    try {
        const { name, image, category, new_price, old_price } = req.body;

        if (!name || !image || !category || !new_price || !old_price) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const products = await Product.find({});
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = new Product({
            id,
            name,
            image,
            category,
            new_price,
            old_price,
        });

        await newProduct.save();
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ success: false, message: "Error saving product", error: error.message });
    }
});

// Get all products endpoint
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
    }
});

// Fetch new collections
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

// Remove product endpoint
app.post('/removeproducts', async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        await Product.findOneAndDelete({ id });
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Error removing product", error: error.message });
    }
});

// API root endpoint
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



