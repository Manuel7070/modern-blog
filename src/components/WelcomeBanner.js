import React from "react";

const WelcomeBanner = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/images/welcome.jpg')",
      }}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Welcome to Modern Blogging
      </h1>
      <p className="text-lg md:text-2xl mb-8">Start blogging with us today</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg">
        Try Now
      </button>
    </div>
  );
};

export default WelcomeBanner;
