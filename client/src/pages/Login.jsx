import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import api from "../utils/api";
import { toast } from "react-toastify";

const Login = () => {
  const { setIsLoggedin, getUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign up") {
        const { data } = await api.post("/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await api.post("/api/auth/login", { email, password });
        if (data.success) {
          setIsLoggedin(true);
          toast.success(data.message);
           getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-200 to bg-purple-400 ">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute cursor-pointer top-5 left-5 sm:left-20 w-28 sm:w-32"
        alt=""
      />
      <div className="bg-slate-900 p-10 rounded-lg  shadow-lg w-full sm:w-94 text-indigo-300 text-sm">
        <h2 className="text-center text-white  text-2xl font-medium mb-4 sm:text-3xl">
          {state === "Sign up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-gray-400  text-sm mb-4">
          {state === "Sign up"
            ? "Create your Account"
            : "Login to your account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign up" && (
            <div className="mb-4 flex items-center gap-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
                value={name}
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email"
              required
              value={email}
            />
          </div>
          <div className="mb-4 flex items-center gap-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C] ">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
              value={password}
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="text-center cursor-pointer text-xs text-indigo-500 mb-4 hover:underline"
          >
            Forgot Password?
          </p>

          <button className="bg-indigo-500 text-white px-4 py-2 rounded-full w-full cursor-pointer mb-4 hover:bg-indigo-400 ">
            {state === "Sign up" ? "Sign Up" : "Login"}
          </button>
        </form>

        {state === "Sign up" ? (
          <p className="text-center text-xs text-gray-400 mb-2">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-center text-xs text-gray-400 mt-4">
            Dont have an account?{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
