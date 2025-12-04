import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

const AddVendor = ({ existingVendor, onClose, onSuccess }) => {
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState({
    userId: "",
    vendorId: "",
    name: "",
    email: "",
    phone: "",
    aadhaar: "",
    pan: "",
    category: "Freelance",
    vendorType: "",
    status: "Active",
    date: new Date().toISOString().split("T")[0],
    utr: "",
    msg: "",
    extra: "",
    uploadDoc: "",
    insertUrls: [],
  });

  // Auto-generate vendor ID
  const generateVendorId = () => {
    return "VEND-" + Math.floor(1000 + Math.random() * 9000);
  };

  // Get user ID from localStorage
  const getUserId = () => {
    let userId = localStorage.getItem("userId");

    if (!userId) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user._id || user.id;
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
        }
      }
    }

    if (!userId) {
      userId = localStorage.getItem("user_id") || localStorage.getItem("id");
    }

    return userId || "";
  };

  useEffect(() => {
    // If editing existing vendor, populate the form
    if (existingVendor) {
      console.log("Editing vendor:", existingVendor);
      setVendor({
        ...existingVendor,
        insertUrls: existingVendor.insertUrls || [],
      });
    } else {
      // If adding new vendor
      const vendorId = generateVendorId();
      const userId = getUserId();

      setVendor((v) => ({
        ...v,
        vendorId: vendorId,
        userId: userId,
      }));

      console.log("Current User ID:", userId);

      if (!userId) {
        setMsg({
          text: "Warning: No user ID found. Please login again.",
          type: "error",
        });
      }
    }
  }, [existingVendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
  };

  // Handle URL changes in the array
  const handleUrlChange = (index, value) => {
    const newUrls = [...vendor.insertUrls];
    newUrls[index] = { url: value };
    setVendor({ ...vendor, insertUrls: newUrls });
  };

  // Add new URL field
  const addUrlField = () => {
    setVendor({
      ...vendor,
      insertUrls: [...vendor.insertUrls, { url: "" }],
    });
  };

  // Remove URL field
  const removeUrlField = (index) => {
    const newUrls = vendor.insertUrls.filter((_, i) => i !== index);
    setVendor({ ...vendor, insertUrls: newUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: "", type: "" });

    // Validation for new vendors
    if (!existingVendor && !vendor.userId) {
      const userId = getUserId();
      if (userId) {
        vendor.userId = userId;
      } else {
        setMsg({
          text: "Error: User ID not found. Please login again.",
          type: "error",
        });
        setLoading(false);
        return;
      }
    }

    console.log("Submitting vendor data:", vendor);

    try {
      let res;

      if (existingVendor) {
        // Update existing vendor
        res = await fetch(API_ENDPOINTS.VENDOR_BY_ID(existingVendor._id), {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vendor),
        });
      } else {
        // Create new vendor
        res = await fetch(API_ENDPOINTS.VENDORS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vendor),
        });
      }

      const responseData = await res.json();
      console.log("Server response:", responseData);

      if (res.ok) {
        setMsg({
          text: existingVendor
            ? "Vendor updated successfully!"
            : "Vendor added successfully!",
          type: "success",
        });

        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }

        // Close modal after 1.5 seconds
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 1500);
      } else {
        setMsg({
          text: responseData.message || responseData.error || "Error saving vendor",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMsg({ text: "Error saving vendor: " + err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    // Modal Overlay
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {existingVendor ? "Edit Vendor" : "Add New Vendor"}
              </h1>
              <p className="text-gray-500 text-sm">
                {existingVendor ? "Update vendor details" : "Fill in the details to register a new vendor"}
              </p>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            type="button"
          >
            <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success/Error Message */}
        {msg.text && (
          <div
            className={`mx-6 mt-4 rounded-xl border p-4 flex items-center gap-3 ${
              msg.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {msg.type === "success" ? (
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="font-medium">{msg.text}</span>
          </div>
        )}

        {/* Modal Body - Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Vendor ID - Read Only */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vendor ID
              </label>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                <input
                  type="text"
                  name="vendorId"
                  value={vendor.vendorId}
                  readOnly
                  className="flex-1 bg-transparent font-mono font-semibold text-blue-900 outline-none"
                />
              </div>
            </div>

            {/* Basic Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={vendor.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter vendor name"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={vendor.email}
                    onChange={handleChange}
                    required
                    placeholder="vendor@example.com"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={vendor.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="vendorType"
                    value={vendor.vendorType}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Influencer, Content Creator"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Document Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="aadhaar"
                    value={vendor.aadhaar}
                    onChange={handleChange}
                    required
                    placeholder="XXXX XXXX XXXX"
                    maxLength="12"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={vendor.pan}
                    onChange={handleChange}
                    required
                    placeholder="XXXXX0000X"
                    maxLength="10"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Document
                  </label>
                  <input
                    type="text"
                    name="uploadDoc"
                    value={vendor.uploadDoc}
                    onChange={handleChange}
                    placeholder="Document URL or path"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UTR Number
                  </label>
                  <input
                    type="text"
                    name="utr"
                    value={vendor.utr}
                    onChange={handleChange}
                    placeholder="Enter UTR number"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Additional Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message / Description
                  </label>
                  <textarea
                    name="msg"
                    value={vendor.msg}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter any message or description"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Extra Notes
                  </label>
                  <textarea
                    name="extra"
                    value={vendor.extra}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter any extra notes"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* URLs Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                URLs / Links
              </h3>
              <div className="space-y-3">
                {vendor.insertUrls && vendor.insertUrls.length > 0 ? (
                  vendor.insertUrls.map((urlObj, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={urlObj.url || ""}
                        onChange={(e) => handleUrlChange(index, e.target.value)}
                        placeholder="https://example.com"
                        className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      {vendor.insertUrls.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeUrlField(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No URLs added yet</p>
                )}
                <button
                  type="button"
                  onClick={addUrlField}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Another URL
                </button>
              </div>
            </div>

            {/* Category & Status Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Category & Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={vendor.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Freelance">Freelance</option>
                    <option value="Agency">Agency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={vendor.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Future">Future</option>
                    <option value="Stand By">Stand By</option>
                    <option value="Blacklist">Blacklist</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer - Action Buttons */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {existingVendor ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {existingVendor ? "Update Vendor" : "Add Vendor"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVendor;