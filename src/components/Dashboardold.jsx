import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios
      .get("https://winexch.blog/api/data/vendors")
      .then((res) => setVendors(res.data));
  }, []);

  const total = vendors.length;
  const active = vendors.filter((v) => v.status === "Active").length;
  const inactive = vendors.filter((v) => v.status === "Inactive").length;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div className="card">Total Vendors: {total}</div>
      <div className="card">Active Vendors: {active}</div>
      <div className="card">Inactive Vendors: {inactive}</div>
    </div>
  );
};

export default Dashboard;
