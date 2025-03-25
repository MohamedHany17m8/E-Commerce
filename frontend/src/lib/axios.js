import axios from "axios";

const isProduction = window.location.hostname !== "localhost";

const axiosInstance = axios.create({
  baseURL: isProduction 
    ? "https://e-commerce-api-rose-eta.vercel.app/api"
    : "/api",
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor to add auth token from localStorage if available
axiosInstance.interceptors.request.use(
  (config) => {
    // For production, try to get token from localStorage as fallback
    if (isProduction) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with improved error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    });
    
    return Promise.reject(error?.response?.data || error.message);
  }
);

export default axiosInstance;
 