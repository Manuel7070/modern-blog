import React, { useState } from "react";
import { auth, db, googleAuthProvider } from "../firebase/firebase"; // Firebase configuration file
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/blogs"); // Redirect to /blogs after successful login
    } catch (err) {
      setError(err.message);
      console.error("Error logging in: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      navigate("/blogs"); // Redirect to /blogs after successful login with Google
    } catch (err) {
      setError(err.message);
      console.error("Error logging in with Google: ", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:bg-gray-200"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 4.35c0-.82-.11-1.61-.29-2.36H6.55A7.99 7.99 0 005.34 12h6.46c-.04-.19-.06-.38-.06-.59zM12 5.66c.79 0 1.56.13 2.3.35l-1.3 1.3c-.81-.23-1.66-.35-2.6-.35-2.46 0-4.53 1.68-5.27 3.94h6.18c.32-.93.97-1.75 1.77-2.33-.6-.36-1.3-.63-2.08-.63-1.63 0-2.98 1.16-3.46 2.71H4.5c.94-2.77 3.4-4.81 6.5-4.81zm-6.5 4.2h3.38c.54-1.57 1.97-2.73 3.69-2.73.63 0 1.22.15 1.75.42-.35-.93-1.23-1.61-2.23-1.61-1.05 0-1.93.63-2.33 1.5-.16.36-.31.75-.45 1.14-.14-.47-.35-.94-.61-1.36-.68-.95-1.8-1.56-2.95-1.56-1.9 0-3.45 1.31-4 3.09-.21.58-.36 1.22-.46 1.84h-.01l-1.68.03C.79 11.45 0 10.72 0 9.85 0 8.31 1.31 7.03 2.87 6.54c.33-.14.7-.24 1.08-.32.1-.23.2-.46.32-.67zM22.25 12.79c-.13-.57-.3-1.13-.54-1.66-.12-.3-.24-.59-.38-.88.19-.58.31-1.19.31-1.83 0-1.61-.65-3.08-1.7-4.16-.62-.62-1.35-1.13-2.14-1.48-.33-.2-.67-.36-1.02-.5-.24-.12-.49-.22-.74-.29-.35-.1-.71-.17-1.08-.17-.88 0-1.74.27-2.5.74-.76.48-1.38 1.14-1.9 1.88-.4.53-.75 1.09-1.04 1.66-.33.59-.59 1.2-.72 1.83-.26 1.28-.12 2.56.4 3.71.54 1.28 1.43 2.44 2.63 3.31 1.3.97 2.85 1.68 4.45 2.13.61.18 1.23.27 1.85.27.8 0 1.56-.12 2.31-.36 1.04-.34 2.04-.88 2.94-1.58.34-.26.67-.55.97-.87.56-.55.97-1.2 1.28-1.89.1-.23.18-.47.24-.71.07-.25.12-.51.12-.77 0-.13-.01-.27-.03-.4-.04-.18-.09-.37-.18-.56zM11.09 20c-.62.38-1.31.61-2.04.61-1.28 0-2.53-.54-3.46-1.41-.64-.63-1.14-1.38-1.53-2.18-.38-.8-.68-1.67-.89-2.55-.08-.26-.15-.53-.22-.8h-.01c-.06-.26-.11-.51-.16-.77-.08-.36-.13-.71-.13-1.06 0-1.17.24-2.31.71-3.39.16-.4.36-.78.58-1.15.16-.28.33-.55.52-.81.27-.36.57-.71.89-1.05.56-.5 1.14-1 1.75-1.46.54-.4 1.14-.75 1.8-1.03.65-.27 1.31-.5 1.98-.64.51-.08 1.02-.12 1.54-.12.76 0 1.52.16 2.23.48.7.34 1.34.85 1.87 1.45.48.51.85 1.09 1.1 1.71.29.67.45 1.37.45 2.1 0 1.16-.21 2.27-.62 3.33-.53 1.25-1.3 2.42-2.29 3.43-1.08 1.09-2.31 2.04-3.67 2.73-.47.18-.98.27-1.49.27-.72 0-1.43-.17-2.07-.49z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">
              Log In with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
