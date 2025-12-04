import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    axios.get(`https://winexch.blog/api/data/vendors/${id}`)
      .then((res) => setVendor(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const updateVendor = async () => {
    try {
      await axios.put(`http://localhost:5000/api/data/vendors/${id}`, vendor);
      alert("Vendor updated successfully!");
      window.location.href = "/vendors";
    } catch (err) {
      alert("Update failed!");
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
