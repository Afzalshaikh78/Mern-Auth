/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import { createContext, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials = true;


  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

const getAuthState = async () => {
  try {
    const { data } = await api.get("/api/auth/is-auth");
    if (data.success) {
      setIsLoggedin(true);
      getUserData(); // fetch user info if logged in
    } else {
      setIsLoggedin(false);
      setUserData(null);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setIsLoggedin(false);
      setUserData(null);
    } else {
      toast.error(error.message);
    }
  }
};


  const getUserData = async () => {
    try {
      const { data } = await api.get("/api/user/data");
      data ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
useEffect(() => {
  const init = async () => {
    await getAuthState(); // check login state from backend
  };
  init();
}, []);


  const value = {
    backendUrl,
    isLoggedin,
    userData,
    setIsLoggedin,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
