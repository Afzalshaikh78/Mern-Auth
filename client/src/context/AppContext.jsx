/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check authentication state - silently handle 401 (not logged in)
  const getAuthState = async () => {
    try {
      const { data } = await api.get("/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData(); // Only fetch user data if authenticated
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      // 401 is expected when not logged in - handle silently
      if (error.response?.status === 401) {
        setIsLoggedin(false);
        setUserData(null);
      } else {
        // Only log/show unexpected errors (500, network issues, etc.)
        console.error("Auth check failed:", error);
      }
    }
  };

  // Fetch user data - only called when authenticated
  const getUserData = async () => {
    try {
      const { data } = await api.get("/api/user/data");
      if (data?.userData) {
        setUserData(data.userData);
      } else {
        setUserData(null);
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      // Handle 401 silently (session expired)
      if (error.response?.status === 401) {
        setIsLoggedin(false);
        setUserData(null);
      } else {
        // Show error for other issues
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  // Logout function
  const logoutUser = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        toast.success("Logged out successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Still log out locally even if server request fails
      setIsLoggedin(false);
      setUserData(null);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    getAuthState(); // Check auth on mount
  }, []);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isLoggedin,
        userData,
        setIsLoggedin,
        setUserData,
        getUserData,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
