import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

function BlogList({ posts }) {
  const [userNames, setUserNames] = useState({});
  const { user } = useAuth();
  const CHAR_LIMIT = 150;

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      const fetchPromises = posts.map(async (post) => {
        if (post.userId) {
          try {
            const userDoc = await getDoc(doc(db, "users", post.userId));
            if (userDoc.exists()) {
              names[post.userId] = userDoc.data().name || "No name";
            } else {
              names[post.userId] = "User not found";
            }
          } catch (error) {
            names[post.userId] = "Error fetching name";
          }
        }
      });

      await Promise.all(fetchPromises);
      setUserNames(names);
    };

    fetchUserNames();
  }, [posts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => {
        const slug = generateSlug(post.title);

        return (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            <Link to={`/blog/${slug}`} className="cursor-pointer">
              <img
                src={post.imageUrl || "https://via.placeholder.com/600x400"}
                alt={post.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x400";
                }}
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {post.description.length > CHAR_LIMIT
                    ? `${post.description.slice(0, CHAR_LIMIT)}...`
                    : post.description}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {post.date}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  Posted by:{" "}
                  <span className="font-semibold">
                    {userNames[post.userId] || "Unknown"}
                  </span>
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default BlogList;
