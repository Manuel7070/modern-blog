import React, { useState } from "react";
import { LockClosedIcon, MailIcon } from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/outline";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log(formData);
  };

  const handleGoogleLogin = () => {
    // Perform Google login logic here
    console.log("Google login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <MailIcon className="w-5 h-5 text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center items-center my-4">
          <span className="text-gray-500">or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          <UserIcon className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-gray-600 font-semibold">Login with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
