import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("userAuthInfo") ?? "{}")?.access_token ??
      ""
    }`,
  },
});

export default apiClient;
