import { useEffect, useState } from "react";
import AddVendor from "./AddVendor";
import CreateCampaign from "./CreateCampaign";

export default function UserDashboard() {
  const [user, setUser] = useState({});
  const [vendors, setVendors] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingVendor, setEditingVendor] = useState(null);

  const getUserId = () => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user._id || user.id;
        } catch (e) {
          console.error("Error parsing user:", e);
        }
      }
    }
    return userId;
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    setUser(storedUser);
    fetchAllData(storedUser._id);
  }, []);


  
  const fetchAllData = async (userId) => {
    setLoading(true);
    await Promise.all([fetchVendors(userId), fetchCampaigns(userId)]);
    setLoading(false);
  };

  const fetchVendors = async (userId) => {
    try {
      const res = await fetch(
        `https://winexch.blog/api/data/vendors/user/${userId}`
      );
      const data = await res.json();
      console.log("Fetched vendors:", data);

      if (Array.isArray(data)) {
        setVendors(data);
      } else if (data.vendors) {
        setVendors(data.vendors);
      } else if (data.data) {
        setVendors(data.data);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const fetchCampaigns = async (userId) => {
    try {
      const res = await fetch(
        `https://winexch.blog/api/data/campaigns/user/${userId}`
      );
      const data = await res.json();
      console.log("Fetched campaigns:", data);

      if (Array.isArray(data)) {
        setCampaigns(data);
      } else if (data.campaigns) {
        setCampaigns(data.campaigns);
      } else if (data.data) {
        setCampaigns(data.data);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  // Handle successful vendor add/update
  const handleVendorSuccess = () => {
    console.log("Vendor saved successfully, refreshing list...");
    fetchAllData(user._id); // Refresh with user ID
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-700 border-green-200",
      inactive: "bg-gray-100 text-gray-700 border-gray-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      completed: "bg-blue-100 text-blue-700 border-blue-200",
      future: "bg-blue-100 text-blue-700 border-blue-200",
      "stand by": "bg-yellow-100 text-yellow-700 border-yellow-200",
      blacklist: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[status?.toLowerCase()] || colors.inactive;
  };

  const handleVendorClick = (vendor) => {
    window.location.href = `/vendor/${vendor.vendorId}/campaigns`;
  };

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.name || "User Dashboard"}
                </h1>
                <p className="text-gray-500 mt-1">
                  {user.email || "user@example.com"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-4">
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {user.role || "User"}
                </p>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg border border-green-200">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Vendors
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {vendors.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-blue-600 font-medium">
                View all vendors
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Campaigns
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {campaigns.length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-purple-600 font-medium">
                View all campaigns
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Campaigns
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {
                    campaigns.filter(
                      (c) => c.status?.toLowerCase() === "active"
                    ).length
                  }
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">
                ↑ Running now
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Budget
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₹
                  {campaigns
                    .reduce((sum, c) => sum + (parseFloat(c.budget) || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-orange-600 font-medium">
                Across all campaigns
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search vendors by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Vendors Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                My Vendors
              </h3>
              <button
                onClick={() => {
                  setEditingVendor(null);
                  setShowAddVendor(true);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
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
                Add Vendor
              </button>
            </div>
          </div>

          <div className="p-6">
            {filteredVendors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor._id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                          {vendor.name?.charAt(0).toUpperCase() || "V"}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {vendor.name || "Vendor Name"}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {vendor.vendorId}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setEditingVendor(vendor);
                          setShowAddVendor(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit vendor"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {vendor.email || "email@example.com"}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        {vendor.phone || "N/A"}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {vendor.vendorType || "Type"}
                      </div>
                    </div>


<button
  onClick={() => handleVendorClick(vendor)}
  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
>
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
  View Campaigns
</button>

                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          vendor.status
                        )}`}
                      >
                        {vendor.status || "Active"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {vendor.category}
                      </span>
                    </div>
                    
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
                <p className="text-gray-500 font-medium">
                  {searchTerm
                    ? "No vendors match your search"
                    : "No vendors yet"}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {searchTerm
                    ? "Try adjusting your search"
                    : "Add your first vendor to get started"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => {
                      setEditingVendor(null);
                      setShowAddVendor(true);
                    }}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Vendor
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Campaigns Section */}
      </div>

      {/* Add/Edit Vendor Modal */}
      {showAddVendor && (
        <AddVendor
          existingVendor={editingVendor}
          onClose={() => {
            setShowAddVendor(false);
            setEditingVendor(null);
          }}
          onSuccess={handleVendorSuccess}
        />
      )}

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Create New Campaign
              </h2>
              <button
                onClick={() => {
                  setShowCreateCampaign(false);
                  fetchAllData(user._id);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <CreateCampaign
              vendorId={selectedVendor}
              onClose={() => {
                setShowCreateCampaign(false);
                fetchAllData(user._id);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}