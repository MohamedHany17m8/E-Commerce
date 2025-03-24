import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Use the proxy from vite.config.js
  timeout: 15000,
  withCredentials: true, // send cookies to the server
});

// Add error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error?.response?.data || error.message);
  }
);

export default axiosInstance;
 