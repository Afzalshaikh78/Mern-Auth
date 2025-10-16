/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    
      <div className="flex flex-col items-center px-4  text-center text-gray-800">
 
        <h1 className="flex items-center gap-2 text-xl font-medium mb-3 sm:text-3xl">
          Hey {userData ? userData.name : ""}!
          <img className="w-8 aspect-square" src={assets.hand_wave} alt="" />
        </h1>
        <h2 className="text-3xl sm:text-5xl mb-4 font-medium">
          Welcome to our app
        </h2>
        <p className="mb-6 max-w-md">
          Lets start with a quick overview of what we have here and what you can
          do with us.
        </p>
        <button className="border border-gray-300 rounded-full px-4 cursor-pointer py-2 hover:bg-gray-100">
          Get Started
        </button>
      </div>
    
  );
};

export default Header;
