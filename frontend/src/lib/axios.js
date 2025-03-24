import axios from "axios";

const isProduction = window.location.hostname !== "localhost";

const axiosInstance = axios.create({
  // In production, use the full API URL
  baseURL: isProduction 
    ? "https://e-commerce-api-rose-eta.vercel.app/api"
    : "/api", // In development, use the proxy
  timeout: 15000,
  withCredentials: true,
});

// Add error handling with better logging
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
 