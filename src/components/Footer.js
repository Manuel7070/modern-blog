import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-white text-2xl font-bold mb-2">Modern Blog</h1>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Modern Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
