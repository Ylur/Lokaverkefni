// src/app/utils/axiosInstance.ts

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Base URL for API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies with requests, cookies? I like cookies!
});

export default axiosInstance;
