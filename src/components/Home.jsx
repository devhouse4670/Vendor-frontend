// src/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1>Welcome to Vendor Management</h1>
      <p>Use this system to manage your vendors easily.</p>

      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
        onClick={() => navigate("/add-vendor")}
      >
        Add Vendor
      </button>

      {/* Optional: you can add more buttons for listing vendors or other pages */}
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "10px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
        onClick={() => navigate("/list-vendors")}
      >
        View All Vendors
      </button>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
        onClick={() => navigate("/create-campaign")}
      >
        ADD Campaign
      </button>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px"
        }}
        onClick={() => navigate("/list-campaigns")}
      >
        View All Campaigns
      </button>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px"
        }}
        onClick={() => navigate("/register")}
      >
        Register Now
      </button>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px"
        }}
        onClick={() => navigate("/Login")}
      >
        Login Now
      </button>
    </div>
  );
}

export default Home;
