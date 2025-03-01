import React from 'react'
import './Admin.css'
import Sidebar from '../Components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import ListProduct from '../Components/ListProduct/ListProduct'
import AddProduct from '../Components/AddProduct/AddProduct'
import Marquee from './Marquee'


const Admin = () => {
  return (
    <div className="admin">
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/listproduct' element={<ListProduct/>}/>
            <Route path='/Marquee' element={<Marquee/>}/>
        </Routes>
    </div>
  )
}

export default Admin