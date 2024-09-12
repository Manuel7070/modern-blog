import React from "react";

const Newsletter = () => {
  return (
    <section className="w-full bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6 text-center bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Get the latest updates, articles, and resources delivered directly to
          your inbox. Stay up to date with the latest news.
        </p>
        <form className="flex flex-col sm:flex-row justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-2 mb-4 sm:mb-0 sm:mr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
