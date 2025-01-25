import React, { useState } from "react";
import "./AccountPage.css";



const AccountPage = () => {
  const [user,] = useState({
    name: "Sakthi",
    email: "sakthi@example.com",
    country: "India",
    addresses: ["123 Main St, Bengaluru, India"],
  });

  return (
    <div className="account-page">

      {/* Main Content */}
      <main className="account-content">
        <h1>Welcome, {user.name}</h1>

        {/* Account Details */}
        <section className="account-details">
          <h2>Account Details</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Country:</strong> {user.country}
          </p>
        </section>

        {/* Addresses */}
        <section className="addresses">
          <h2>Addresses</h2>
          {user.addresses.length > 0 ? (
            <ul>
              {user.addresses.map((address, index) => (
                <li key={index}>{address}</li>
              ))}
            </ul>
          ) : (
            <p>No addresses found.</p>
          )}
        </section>

        {/* Order History */}
        <section className="order-history">
          <h2>Order History</h2>
          <p>You haven't placed any orders yet.</p>
        </section>

        {/* Logout Button */}
        <button
          className="logout-btn"
          onClick={() => alert("You have been logged out.")}
        >
          Log out
        </button>
      </main>
      
    </div>
  );
};

export default AccountPage;
