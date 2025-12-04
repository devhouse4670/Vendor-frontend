import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddVendor from "./components/AddVendor";
import ListVendors from "./components/ListVendors";
import CreateCampaign from "./components/CreateCampaign";
import ListCampaign from "./components/Listcampaign"; // import ListVendors from "./components/ListVendors"; // optional for later
import EditVendor from "./components/EditVendor";
import ListCampaigns from "./components/Listcampaign";
import EditCampaign from "./components/EditCampaign";
import AddCampaign from "./components/CreateCampaign";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard1";
import UserList from "./components/UserList";
import UserDashboard from "./components/UserDashboard";
import { AdminRoute, UserRoute } from "./components/ProtectedRoutes";
import AdminDashboard from "./components/AdminDashboard";
import VendorCampaigns from "./components/VendorCampaigns";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />
        /
        <Route path="/" element={<Login />} />
        <Route path="/admin/:id" element={<AdminDashboard />} />
        <Route path="/user-dashboard/:id" element={<UserDashboard />} />
        <Route path="/add-vendor" element={<AddVendor />} />
        <Route path="/list-vendors" element={<ListVendors />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/list-campaigns" element={<ListCampaign />} />
        <Route path="/edit/:id" element={<EditVendor />} />
        <Route path="/campaign" element={<ListCampaigns />} />
        <Route path="/campaign/add" element={<AddCampaign />} />
        <Route path="/campaign/edit/:id" element={<EditCampaign />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/Login" element={<Login />} /> */}
        <Route path="/dashboard1" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user/:id" element={<UserDashboard />} />
        <Route path="UserDashboard" element={<UserDashboard />} />
        <Route
          path="/vendor/:vendorId/campaigns"
          element={<VendorCampaigns />}
        />
        
      </Routes>
    </Router>
  );
}

export default App;
