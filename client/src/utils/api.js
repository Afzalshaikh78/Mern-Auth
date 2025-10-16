import axios from "axios";

// Use env variable or fallback to localhost
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: backendUrl || "http://localhost:3000", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
