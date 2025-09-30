import axios from "axios";

// Use env variable or fallback to localhost
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "https://mern-auth-g2gy.onrender.com";

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
