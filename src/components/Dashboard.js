import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore"; // Firebase
import { db } from "../firebase/firebase"; // Firebase config

function Dashboard() {
  const [posts, setPosts] = useState([]); // State to store the posts
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Dashboard layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <ul>
            <li className="mb-4">
              <a
                href="#posts"
                className="text-gray-700 dark:text-gray-300 hover:underline"
              >
                All Posts
              </a>
            </li>
            {/* You can add more links here */}
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            All Posts
          </h2>

          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length > 0 ? (
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
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
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
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No posts available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
