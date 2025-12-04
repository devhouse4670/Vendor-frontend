import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import VendorCampaigns from "./components/VendorCampaigns";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/vendor/:vendorId/campaigns" 
          element={
            <ProtectedRoute>
              <VendorCampaigns />
            </ProtectedRoute>
          } 
        />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Page */}
        <Route path="*" element={<div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600">Page not found</p>
        </div>} />
      </Routes>
    </Router>
  );
}

export default App;