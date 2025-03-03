import React from "react";
import "./Customer.css";
import Sidebar from "../Sidebar/Sidebar";

const Customer = () => {
  return (
    <div className="customer-container">
        <Sidebar/>
    <div className="customer-title">
      <h2>All Customer Details</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {/* Data Rows Will Go Here */}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Customer;