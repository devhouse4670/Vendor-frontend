import React from "react";
import { FiLogOut, FiUser } from "react-icons/fi";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-lg">
      {/* LOGO */}
      <h1 className="text-2xl font-bold tracking-wide">Vendor Panel</h1>

      {/* Right side icons */}
      <div className="flex items-center gap-6 text-xl">
        <FiUser className="cursor-pointer hover:text-blue-400 transition" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
