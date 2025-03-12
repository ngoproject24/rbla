import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../Components/ordersummary/OrderSummary";
import './AccountPage.css';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export default function AccountPage({ userProfileData }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    if (userProfileData) {
      setUserData({
        name: userProfileData.name || "",
        email: userProfileData.email || "",
        phone: userProfileData.phone || "",
        dob: userProfileData.dob || "",
        gender: userProfileData.gender || "",
      });
    }
  }, [userProfileData]);

  return (
    
      <div className="account-container">
        <h2>Account Details</h2>
        <div className="account-info">
          <p><strong>Full Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Date of Birth:</strong> {userData.dob}</p>
          <p><strong>Gender:</strong> {userData.gender}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="button-container">
          <button className="update-btn" onClick={() => {
            localStorage.removeItem("auth_token");
            navigate("/UserProfile");
          }}>
            <FaArrowLeft />
          </button>

          <button className="next-btn" onClick={() => {
            localStorage.removeItem("auth_token");
            navigate("/Delivery");
          }}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    
  );
}
