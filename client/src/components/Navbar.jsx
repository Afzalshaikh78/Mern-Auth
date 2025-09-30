import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import api from "../utils/api";
import { toast } from "react-toastify";

const Navbar = () => {
  const { userData, setUserData, setIsLoggedin } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const sendVerifyOtp = async () => {
    try {
      const { data } = await api.post("/api/auth/send-verify-otp");
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-between items-center w-full p-4 sm:p-6 sm:px-20 absolute top-0">
      <img className="w-28 sm:w-32" src={assets.logo} alt="" />

      {userData ? (
        <div className="relative">
          <div
            className="flex items-center justify-center h-8 w-8 rounded-full bg-black text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {userData.name[0].toUpperCase()}
          </div>

          {menuOpen && (
            <div className="absolute top-10 right-0 bg-gray-100 text-sm rounded shadow-md">
              {!userData.isAccountVerified && (
                <button
                  onClick={sendVerifyOtp}
                  className="py-2 px-4 hover:bg-gray-200 w-full text-left"
                >
                  Verify
                </button>
              )}
              <button
                onClick={logout}
                className="py-2 px-4 hover:bg-gray-200 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
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
