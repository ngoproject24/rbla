import React, { useState } from 'react'; 
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginSignup } from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import { Home } from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Towels from './Pages/Towels';
import Wishlist from './Pages/Wishlist';
import Bags from './Pages/Bags';
import Napkins from './Pages/Napkins';
import Bedsheets from './Pages/Bedsheets';
import Cupcoaster from './Pages/Cupcoaster';
import Bamboo from './Pages/Bamboo';
import Paperfiles from './Pages/Paperfiles';
import CustProduct from './Pages/custproduct';
import PaintApp from "./PaintApp";
import ListProduct from './Components/ListProduct/ListProduct';
import AddProduct from './Components/AddProduct/AddProduct';
import CustomDesignPage from './Pages/CustomDesignPage';
import UploadDesignAndCheckout from './Pages/UploadDesignAndCheckout';
import Checkout from './Pages/Checkout';
import PlaceOrder from './Pages/PlaceOrder';
import AboutPage from './Pages/AboutPage';
import ProductPage from './Pages/ProductPage';
import ContactUs from './Pages/ContactUs';
import Gallery from './Pages/Gallery';
import Vaagai from './Pages/vaagai';
import Varnam from './Pages/varnam';
import Siragugal from './Pages/siragugal';
import UpdateLocation from "./Pages/Location";
import ReturnsOrders from './Pages/ReturnsOrders';
import UserProfile from './Pages/UserProfile';
import { WishlistProvider } from "./Context/WishlistContext";
import { CartProvider } from "./Context/CartContext";
import MyOrders from './Pages/MyOrders';
import AdminPanel from "./Pages/AdminPanel"; 
import Customer from './Components/Customer/Customer';
import CheckoutModal from './Pages/CheckoutModal';
import OrderProcess from './Components/ordersummary/OrderSummary';
import PaymentComponent from './Pages/PaymentComponent';
import BillingAddress from './Pages/BillingAddress';
import ReviewSummary from './Components/ReviewSummary/ReviewSummary';
import AdminOrder from './Components/AdminOrder/AdmineOrder';
import ReviewList from './Components/ReviewList/ReviewList';
import AdminUser from './Components/AdminUser/AdminUser';
import Admin from './Components/Admin/Admin';
import SalesReport from './Components/SalesReport/SalesReport';



const App = () => {
  const [units, setUnits] = useState([]); 

  const addUnit = (newUnit) => {
    setUnits((prevUnits) => [...prevUnits, newUnit]);
  };

  
  return (
    
    
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/towels" element={<Towels />} />
              <Route path="/bags" element={<Bags />} />
              <Route path="/napkins" element={<Napkins />} />
              <Route path="/bedsheets" element={<Bedsheets />} />
              <Route path="/cupcoaster" element={<Cupcoaster />} />
              <Route path="/bamboo" element={<Bamboo />} />
              <Route path="/paperfiles" element={<Paperfiles />} />
              <Route path="/custproduct" element={<CustProduct />} />
              <Route path="/paintapp" element={<PaintApp />} />
              <Route path="/listproduct" element={<ListProduct />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/customdesignpage" element={<CustomDesignPage />} />
              <Route path="/uploaddesignandcheckout" element={<UploadDesignAndCheckout />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/AboutPage" element={<AboutPage />} />
              <Route path="/ProductPage" element={<ProductPage />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/Gallery" element={<Gallery />} />
              <Route path="/Vaagai" element={<Vaagai />} />
              <Route path="/varnam" element={<Varnam />} />
              <Route path="/siragugal" element={<Siragugal />} />
              <Route path="/UpdateLocation" element={<UpdateLocation />} />
              <Route path="/ReturnOrder" element={<ReturnsOrders />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/MyOrders" element={<MyOrders />} />
              <Route path="/customer" element={<Customer/>}/>
              <Route path="/checkout" element={<CheckoutModal/>}/>
              <Route path="/OrderSummary" element={<OrderProcess/>}/>
              <Route path="/PaymentComponent" element={<PaymentComponent/>}/>
              <Route path="/BillingAddress" element={<BillingAddress/>}/>
              <Route path="/ReviewSummary" element={<ReviewSummary/>}/>
              <Route path="/adminorder" element={<AdminOrder/>}/>
              <Route path="/adminreview" element={<ReviewList/>}/>
              <Route path="/adminuser" element={<AdminUser/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/salesreport" element={<SalesReport/>}/>
              {/* Admin Panel Route */}
            <Route path="/AdminPanel" element={<AdminPanel/>}/>
            </Routes>
            
            
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    
  );
};

export default App;
