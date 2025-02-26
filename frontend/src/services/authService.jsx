import api from "./api";
import cookies from "js-cookie";

/**
 * Authentication service for handling user authentication
 */
const authService = {
  /**
   * Login user with email and password
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise} Promise with user data
   */
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      cookies.set("token", response.data.token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
    return response.data;
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Promise with user data
   */
  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    if (response.data.token) {
      cookies.set("token", response.data.token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
    return response.data;
  },

  /**
   * Logout the current user
   * @returns {Promise} Promise with logout status
   */
  logout: async () => {
    const response = await api.post("/auth/logout");
    cookies.remove("token");
    return response.data;
  },

  /**
   * Get the current user's profile
   * @returns {Promise} Promise with user profile data
   */
  getProfile: async () => {
    return api.get("/auth/profile");
  },

  /**
   * Update the current user's profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise} Promise with update status
   */
  updateProfile: async (profileData) => {
    return api.put("/auth/profile", profileData);
  },

  /**
   * Change the current user's password
   * @param {Object} passwordData - Password change data
   * @param {string} passwordData.currentPassword - Current password
   * @param {string} passwordData.newPassword - New password
   * @returns {Promise} Promise with change status
   */
  changePassword: async (passwordData) => {
    return api.post("/auth/change-password", passwordData);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user is authenticated
   */
  isAuthenticated: () => {
    return !!cookies.get("token");
  },
};

export default authService;
