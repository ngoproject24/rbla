import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginSignup } from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails'; // Import ProductDetails

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
import Admin from './Pages/Admin';
import ListProduct from './Components/ListProduct/ListProduct';
import AddProduct from './Components/AddProduct/AddProduct';
import CustomDesignPage from './Pages/CustomDesignPage';
import UploadDesignAndCheckout from './Pages/UploadDesignAndCheckout'
import Checkout from './Pages/Checkout';
import PlaceOrder from './Pages/PlaceOrder';
import AccountPage from './Pages/AccountPage';
import AboutPage from './Pages/AboutPage';
import ProductPage from './Pages/ProductPage';
import ContactUs from './Pages/ContactUs';
import Gallery from './Pages/Gallery';
import Vaagai from './Pages/vaagai';
import Varnam from './Pages/varnam';
import Siragugal from './Pages/siragugal';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';





// Towels data
const towels = [
  { id: 1, name: 'Rose printed towel', image: '/assets/T1.png', new_price: 130.0, old_price: 80.0 },
  { id: 2, name: 'Blue leaf towel', image: '/assets/T2.png', new_price: 130.0, old_price: 80.0 },
  { id: 3, name: 'Brown cotton towel', image: '/assets/T3.png', new_price: 130.0, old_price: 80.0 },
  { id: 4, name: 'Multi circle cotton towel', image: '/assets/T4.png', new_price: 130.0, old_price: 80.0 },
  { id: 5, name: 'Baby penguin towel', image: '/assets/T5.png', new_price: 130.0, old_price: 80.0 },
];

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      
      <Routes>
        <Route path="/" element={<Towels towels={towels} />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/towels/:id" element={<ProductDetails towels={towels} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/towels" element={<Towels towels={towels} />} />
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
        <Route path="/uploaddesignandcheckout" element={<UploadDesignAndCheckout/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/placeorder" element={<PlaceOrder/>}/>
        <Route path="/accountpage" element={<AccountPage/>}/>
        <Route path="/AboutPage" element={<AboutPage/>}/>
        <Route path="/ProductPage" element={<ProductPage/>}/>
        <Route path="/ContactUs" element={<ContactUs/>}/>
        <Route path="/Gallery" element={<Gallery/>}/>
        <Route path="/Vaagai" element={<Vaagai/>}/>
        <Route path="/varnam" element={<Varnam/>}/>
        <Route path="/siragugal" element={<Siragugal/>}/>
        <Route path="/Header" element={<Header/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
