import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { API_ENDPOINTS } from "../config/api";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");

  const fetchVendors = async () => {
    try {
const res = await axios.get(API_ENDPOINTS.VENDORS);
// data is in res.data      setVendors(res.data);
    } catch (err) {
      console.error("Failed to fetch vendors", err);
    }
  };

  const deleteVendor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;

    try {
await axios.delete(API_ENDPOINTS.VENDOR_BY_ID(id));
      fetchVendors();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const filtered = vendors.filter((v) =>
    v.vendorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-3xl font-semibold mb-1">Vendors Management</h2>
      <p className="text-gray-500 mb-6">Vendor List</p>

      {/* Card */}
      <div className="bg-white shadow-md rounded-2xl p-6">

        {/* Search Bar */}
        <div className="flex items-center mb-5 max-w-xs">
          <FiSearch className="text-gray-500 text-xl mr-2" />
          <input
            type="text"
            placeholder="Search vendor..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Handled By</th>
                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Status</th>
                <th className="px-4 py-3 text-center text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((vendor) => (
                <tr
                  key={vendor._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{vendor.vendorName}</td>
                  <td className="px-4 py-3">{vendor.category}</td>
                  <td className="px-4 py-3">{vendor.handledBy}</td>
                  <td className="px-4 py-3">{vendor.status}</td>

                  <td className="px-4 py-3 text-center space-x-4">

                    {/* Edit Button */}
                    <button
                      onClick={() => (window.location.href = `/edit/${vendor._id}`)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FiEdit size={18} />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteVendor(vendor._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default VendorList;
