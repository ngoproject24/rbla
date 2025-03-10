import React from 'react'
import'./Sidebar.css'
import{Link} from 'react-router-dom'

import cart from '../Assets/cart.png'; // Path to your cart icon
import List from '../Assets/list.png'; // Path to your cart icon

const Sidebar = () => {
  return (
    <div className="sidebar">
          
            


        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={cart} alt="Cart" className="nav-cart-icon" />
            <p>ADD PRODUCT</p>
        </div>
        </Link>

        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={List} alt="Cart" className="nav-List-icon" />
            <p>PRODUCT LIST</p>
        </div>
        </Link>

        <Link to={'/customer'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={List} alt="Cart" className="nav-List-icon" />
            <p>CUSTOMER</p>
        </div>
        </Link>

        

        <Link to={'/Adminpanel'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          
            <p>ADD MESSAGE</p>
        </div>
        </Link>
      
    </div>
  )
}

export default Sidebar