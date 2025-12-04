import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorList from "../components/ListVendors";
import ListCampaigns from "../components/Listcampaign";
import AddVendor from "../components/AddVendor";
import UserList from "../components/UserList";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/Login");
  };

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },

    {
      id: "Addvendor",
      name: "Addvendor",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },

    {
      id: "vendors",
      name: "Vendors",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: "campaigns",
      name: "Campaigns",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
    },

    {
      id: "users",
      name: "Users",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent hidden sm:block">
                VendorHub
              </h1>
            </div>
          </div>

          {/* Right: User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-white"
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
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-700">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user.email || "user@example.com"}
                </p>
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  showLogoutDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showLogoutDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-slide-down">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-700">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email || "user@example.com"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 font-medium"
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-xl transition-all duration-300 z-40 ${
            isSidebarOpen ? "w-64" : "w-0 lg:w-20"
          }`}
        >
          <div className="p-4 h-full overflow-y-auto">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeMenu === item.id
                      ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg shadow-purple-500/30"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${!isSidebarOpen && "lg:justify-center"}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-0" : "lg:ml-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {menuItems.find((item) => item.id === activeMenu)?.name ||
                  "Dashboard"}
              </h2>
              <p className="text-gray-600">
                Welcome back! Here's what's happening today.
              </p>
            </div>

            {/* Content Based on Active Menu */}
            <div className="grid gap-6">
              {activeMenu === "dashboard" && (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-green-500 text-sm font-semibold">
                          +12%
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        234
                      </h3>
                      <p className="text-gray-600 text-sm">Total Vendors</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                            />
                          </svg>
                        </div>
                        <span className="text-green-500 text-sm font-semibold">
                          +8%
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        45
                      </h3>
                      <p className="text-gray-600 text-sm">Active Campaigns</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-green-600"
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
                        <span className="text-green-500 text-sm font-semibold">
                          +23%
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        892
                      </h3>
                      <p className="text-gray-600 text-sm">Completed Tasks</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-orange-500 text-sm font-semibold">
                          12
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        23
                      </h3>
                      <p className="text-gray-600 text-sm">Pending Reviews</p>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                </>
              )}

              {activeMenu === "Addvendor" && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Addvendor
                    </h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate("/list-vendors")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        View All New
                      </button>
                    </div>
                  </div>
                  <AddVendor />
                </div>
              )}

              {activeMenu === "vendors" && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Vendors Management
                    </h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate("/add-vendor")}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add Vendor1
                      </button>
                      <button
                        onClick={() => navigate("/list-vendors")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        View All
                      </button>
                    </div>
                  </div>
                  <VendorList />
                </div>
              )}

              {activeMenu === "campaigns" && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Campaigns Overview
                    </h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate("/create-campaign")}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add Campaign
                      </button>
                      <button
                        onClick={() => navigate("/list-campaigns")}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        View All
                      </button>
                    </div>
                  </div>
                  <ListCampaigns />
                </div>
              )}

              {activeMenu === "users" && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      User Management
                    </h3>
                    <button
                      onClick={() => navigate("/register")}
                      className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
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
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Register New User
                    </button>
                  </div>
                  <p className="text-gray-600">
                    Your user list component will appear here...
                  </p>
                </div>
              )}
            </div>
            
            <UserList />
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
