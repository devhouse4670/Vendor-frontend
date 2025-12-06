// src/config/api.js
// Use deployed backend URL (no slash at end)
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://vendor-backend.onrender.com";

export const API_ENDPOINTS = {
  // Vendor endpoints
  VENDORS: `${API_BASE_URL}/api/data/vendors`,
  VENDOR_BY_ID: (id) => `${API_BASE_URL}/api/data/vendors/${id}`,
  VENDORS_BY_USER: (userId) => `${API_BASE_URL}/api/data/vendors/user/${userId}`,
  
  // Campaign endpoints
  CAMPAIGNS: `${API_BASE_URL}/api/data/campaigns`,
  CAMPAIGN_BY_ID: (id) => `${API_BASE_URL}/api/data/campaigns/${id}`,
  CAMPAIGNS_BY_USER: (userId) => `${API_BASE_URL}/api/data/campaigns/user/${userId}`,
  CAMPAIGNS_BY_VENDOR: (vendorId) => `${API_BASE_URL}/api/data/campaigns/vendor/${vendorId}`,
};

export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {  // ✅ Fixed: ( instead of backtick
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",   // this tells fetch to send cookies and auth headers
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        response: { data: { error: errorData.message || "Login failed" } },
      };
    }
    
    const data = await response.json();
    return { data: { token: data.token, user: data.user } };
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {  // ✅ Fixed: ( instead of backtick
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",  // ✅ Added for consistency
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        response: { data: { error: errorData.message || "Registration failed" } },
      };
    }
    
    const data = await response.json();
    return { data: { token: data.token, user: data.user } };
  },

  logout: async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    return { success: true };
  },
};  // ✅ Added closing brace

export default API_BASE_URL;
