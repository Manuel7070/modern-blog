import React from "react";

function BlogList({ posts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={post.imageUrl || "https://via.placeholder.com/600x400"}
            alt={post.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400"; // Fallback image on error
            }}
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {post.description}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {post.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
