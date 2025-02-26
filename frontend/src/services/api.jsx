import cookies from "js-cookie";

import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If the error is 401 and not already retrying
    const cookie = cookies.get("token");
    if (error.response?.status === 401 && !originalRequest._retry && cookie) {
      try {
        // Try to refresh the token
        const { data } = await api.post("/auth/refresh-token");

        // If token refresh is successful, save the new token
        if (data.token) {
          cookies.set("token", data.token);

          // Update the authorization header
          api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
          originalRequest.headers.Authorization = `Bearer ${data.token}`;

          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        cookies.remove("token");
        if (
          !window.location.pathname.startsWith("/login") &&
          !window.location.pathname.startsWith("/signup")
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
