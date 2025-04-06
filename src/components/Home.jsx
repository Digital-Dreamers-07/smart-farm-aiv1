import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at top left, #14532d, #064e3b)",
      }}
    >
      {/* 🔲 Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />

      {/* 💠 Glass card content */}
      <div className="text-center text-white z-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-10 shadow-xl max-w-3xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Smart Farming Solutions
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Empowering farmers with AI-driven insights for better crop management and higher yields
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/crop" className="w-full md:w-52">
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-semibold transition"
              style={{ borderRadius: "12px" }}
            >
              Get Started
            </button>
          </Link>
          <Link to="/marketprice" className="w-full md:w-52">
            <button
              className="w-full bg-white text-green-800 py-3 text-lg font-semibold border border-green-600 hover:bg-green-100 transition"
              style={{ borderRadius: "12px" }}
            >
              View Market Prices
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
