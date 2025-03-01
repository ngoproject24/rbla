import React from 'react';


import AddProduct from './AddProduct/AddProduct';
import ListProduct from './ListProduct/ListProduct';


const AdminDashboard = ({ section }) => {
  return (
    
    <div className="admindashboard">
      {section ? (
        <>
        
          {section === 'AddProduct' && <h1 className="content-title"><AddProduct/></h1>}
          
          {section === 'ListProduct' && <h1 className="content-title"><ListProduct/></h1>}
          
          
          )
        </>
      ) : (
        <h1 className="content-title">Please select a section</h1>
      )}
    </div>
  );
};

export default AdminDashboard;