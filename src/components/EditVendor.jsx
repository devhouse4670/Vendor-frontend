import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { API_ENDPOINTS } from "../config/api";

const EditVendor = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState({
    vendorName: "",
    email: "",
    phone: "",
    aadhaar: "",
    pan: "",
    category: "",
    vendorType: "",
    handledBy: "",
    status: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.VENDOR_BY_ID(id));
        const data = await res.json();
        setVendor(data);
      } catch (err) {
        console.log(err);
        alert("Failed to load vendor data");
      }
    };

    fetchVendor();
  }, [id]);

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const updateVendor = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_ENDPOINTS.VENDOR_BY_ID(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendor),
      });

      if (res.ok) {
        alert("Vendor updated successfully!");
        window.location.href = "/vendors";
      } else {
        const data = await res.json();
        alert(data.message || data.error || "Update failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit Vendor</h2>

      <input name="vendorName" value={vendor.vendorName} onChange={handleChange} />

      <input name="email" value={vendor.email} onChange={handleChange} />

      <input name="phone" value={vendor.phone} onChange={handleChange} />

      <input name="aadhaar" value={vendor.aadhaar} onChange={handleChange} />

      <input name="pan" value={vendor.pan} onChange={handleChange} />

      <input name="category" value={vendor.category} onChange={handleChange} />

      <input name="vendorType" value={vendor.vendorType} onChange={handleChange} />

      <input name="handledBy" value={vendor.handledBy} onChange={handleChange} />

      <select name="status" value={vendor.status} onChange={handleChange}>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <button onClick={updateVendor}>Update Vendor</button>
    </div>
  );
};

export default EditVendor;
