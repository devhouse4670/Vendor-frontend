// src/config/api.js (Frontend)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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


// Auth API functions
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        response: {
          data: {
            error: errorData.message || errorData.error || 'Login failed'
          }
        }
      };
    }
    
    const data = await response.json();
    // Return in the format expected by Login component
    return {
      data: {
        token: data.token,
        user: data.user
      }
    };
  },
  
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        response: {
          data: {
            error: errorData.message || errorData.error || 'Registration failed'
          }
        }
      };
    }
    
    const data = await response.json();
    return {
      data: {
        token: data.token,
        user: data.user
      }
    };
  },
  
  logout: async () => {
    // Clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    return { success: true };
  },
};

export default API_BASE_URL;