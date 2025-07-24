// services/userService.js
import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: "/api/users",
});

// Store token in localStorage and return response data
export const loginUser = async (credentials) => {
  const res = await API.post("/login", credentials);

  // Save token and user to localStorage
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/signup", data);

  // Registration doesn't log in user, so don't store token yet
  return res.data;
};
