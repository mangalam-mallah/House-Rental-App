// src/services/axiosInstance.js
import axios from "axios";

// ✅ Step 1: Create the instance first
const axiosInstance = axios.create({
  baseURL: "/api",
});

// ✅ Step 2: Add request interceptor (AFTER it's declared)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Step 3: Add response interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Axios response error:", err.response || err.message);
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// ✅ Step 4: Export it at the end
export default axiosInstance;
