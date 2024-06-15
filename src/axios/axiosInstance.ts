// src/api.js or src/axiosInstance.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("userAuthInfo" || "null")).access_token
    }`,
  },
});

export default apiClient;
