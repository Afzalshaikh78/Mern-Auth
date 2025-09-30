import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import api from "../utils/api.js";
import { toast } from "react-toastify";

const PasswordReset = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const inputRef = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const input = inputRef.current[index];

      // if current box is empty, move focus back
      if (input.value === "" && index > 0) {
        inputRef.current[index - 1].focus();
      } else {
        // otherwise clear current value
        input.value = "";
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/auth/send-reset-otp", { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitnewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to bg-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute cursor-pointer top-5 left-5 sm:left-20 w-28 sm:w-32"
        alt=""
      />
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 p-8 rounded-2xl shadow w-96 text-sm"
        >
          <h1 className="text-center text-white text-2xl font-medium mb-5 sm:text-3xl">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address
          </p>
          <div className="flex items-center gap-4 px-5 py-2.5  rounded-xl bg-gray-800 mb-6  text-gray-50">
            <img src={assets.mail_icon} alt="" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required
              placeholder="Email"
              className="outline-none  bg-transparent  text-white"
            />
          </div>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-full w-full cursor-pointer mb-4 hover:bg-indigo-400">
            Submit
          </button>
        </form>
      )}
      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 p-8 rounded-2xl shadow w-96 text-sm"
        >
          <h1 className="text-center text-white text-2xl font-medium mb-8 sm:text-3xl">
            Reset password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Please enter the OTP sent to your email
          </p>
          <div className="flex justify-between mb-8 " onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  key={index}
                  maxLength="1"
                  required
                  ref={(el) => (inputRef.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                />
              ))}
          </div>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-full w-full cursor-pointer mb-4 hover:bg-indigo-400">
            Submit
          </button>
        </form>
      )}
      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitnewPassword}
          className="bg-slate-900 p-8 rounded-2xl shadow w-96 text-sm"
        >
          <h1 className="text-center text-white text-2xl font-medium mb-5 sm:text-3xl">
            New password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the new password
          </p>
          <div className="flex items-center gap-4 px-5 py-2.5  rounded-xl bg-gray-800 mb-6  text-gray-50">
            <img src={assets.lock_icon} alt="" />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              required
              placeholder="password"
              className="outline-none  bg-transparent  text-white"
            />
          </div>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-full w-full cursor-pointer mb-4 hover:bg-indigo-400">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default PasswordReset;
