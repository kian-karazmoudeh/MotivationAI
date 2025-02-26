import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user profile on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (authService.isAuthenticated()) {
        try {
          setLoading(true);
          const response = await authService.getProfile();
          setUser(response.data);
          setError(null);
        } catch (err) {
          console.error('Failed to load user profile:', err);
          setError('Failed to load user profile');
          // If token is invalid, clear it
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const data = await authService.login(credentials);
      // Fetch user profile after login
      const profileResponse = await authService.getProfile();
      setUser(profileResponse.data);
      setError(null);
      return data;
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setLoading(true);
      const data = await authService.signup(userData);
      // Fetch user profile after signup
      const profileResponse = await authService.getProfile();
      setUser(profileResponse.data);
      setError(null);
      return data;
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err.response?.data?.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout failed:', err);
      setError(err.response?.data?.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      await authService.updateProfile(profileData);
      // Refresh user data
      const profileResponse = await authService.getProfile();
      setUser(profileResponse.data);
      setError(null);
    } catch (err) {
      console.error('Profile update failed:', err);
      setError(err.response?.data?.message || 'Profile update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Change password function
  const changePassword = async (passwordData) => {
    try {
      setLoading(true);
      await authService.changePassword(passwordData);
      setError(null);
    } catch (err) {
      console.error('Password change failed:', err);
      setError(err.response?.data?.message || 'Password change failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 