import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import api from "../utils/api";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const {isLoggedin,userData,getUserData} = useContext(AppContext);
  const navigate = useNavigate();
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
    })

}

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRef.current.map(e => e.value)
      const otp = otpArray.join("");
      const {data} = await api.post('/api/auth/verify-account',{otp})
      if(data.success){
       
        toast.success(data.message)
        getUserData();
        navigate("/")
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message);
    }
}
  
  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/")
},[isLoggedin, navigate, userData])



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to bg-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute cursor-pointer top-5 left-5 sm:left-20 w-28 sm:w-32"
        alt=""
      />
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl shadow w-96 text-sm">
        <h1 className="text-center text-white text-2xl font-medium mb-8 sm:text-3xl">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Please enter the OTP sent to your email
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
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
        <button  className="bg-indigo-500 text-white px-4 py-2 rounded-full w-full cursor-pointer mb-4 hover:bg-indigo-400">
          Verify Email
        </button>
      </form>
    </div>
  );
}

export default EmailVerify
