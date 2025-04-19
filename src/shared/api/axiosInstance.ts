import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://biomarket-backend-6.onrender.com/api"
    : "/api",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json"
  },
  withCredentials: true,
  timeout: 5000
});
