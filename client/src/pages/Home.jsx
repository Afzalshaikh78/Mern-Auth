import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  return <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white">
    <Navbar />
    <Header/>
  </div>;
};

export default Home;
