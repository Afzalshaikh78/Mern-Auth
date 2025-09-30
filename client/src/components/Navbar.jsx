import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import api from "../utils/api";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  axios.defaults.withCredentials = true;
  const { userData, setUserData, setIsLoggedin } = useContext(AppContext);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await api.post("/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(null);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerifyOtp = async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await api.post("/api/auth/send-verify-otp");
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-between items-center w-full p-4 sm:p-6 sm:px-20  absolute  top-0">
      <img className="w-28 sm:w-32" src={assets.logo} alt="" />
      {/* {navigate to login page} */}
      {userData ? (
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <div className="bg-gray-100 text-sm rounded shadow-md ">
              {!userData.isAccountVerified && (
                <button
                  onClick={sendVerifyOtp}
                  className="py-2 px-4 hover:bg-gray-200"
                >
                  Verify
                </button>
              )}

              <div
                onClick={logout}
                className="py-2  px-4 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 border border-gray-500 rounded-full px-5 py-2 text-gray-800 cursor-pointer transition-all hover:bg-gray-100"
        >
          Login
          <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
