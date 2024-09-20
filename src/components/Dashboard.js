import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { TrashIcon } from "@heroicons/react/solid";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [clickedPosts, setClickedPosts] = useState([]); // For liked posts
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const readPostsRef = useRef(null); // Ref for Read Posts section
  const myPostsRef = useRef(null); // Ref for My Posts section

  // Fetch all posts for "My Posts" section
  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const postsQuery = query(
          collection(db, "posts"),
          where("userId", "==", user.uid) // Filter posts by user ID
        );
        const querySnapshot = await getDocs(postsQuery);
        const userPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user posts: ", error);
      }
      setLoading(false);
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  // Fetch liked posts for the "Read Posts" section
  useEffect(() => {
    if (user) {
      const fetchClickedPosts = async () => {
        setLoading(true);
        try {
          const userInteractionsSnapshot = await getDocs(
            collection(db, "userInteractions")
          );
          const userInteractions = userInteractionsSnapshot.docs.find(
            (doc) => doc.id === user.uid
          );

          if (userInteractions) {
            const clickedPostIds = Object.keys(userInteractions.data());
            const clickedPostsData = posts.filter((post) =>
              clickedPostIds.includes(post.id)
            );
            setClickedPosts(clickedPostsData);
          }
        } catch (error) {
          console.error("Error fetching clicked posts: ", error);
        }
        setLoading(false);
      };

      fetchClickedPosts();
    }
  }, [user, posts]);

  // Handle navigation to sections
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <ul>
            <li className="mb-4">
              <button
                onClick={() => scrollToSection(readPostsRef)}
                className="text-gray-700 dark:text-gray-300 hover:underline"
              >
                Read Posts
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => scrollToSection(myPostsRef)}
                className="text-gray-700 dark:text-gray-300 hover:underline"
              >
                My Posts
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Read Posts Section */}
          <h2
            ref={readPostsRef} // Attach the ref here
            className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Clicked Posts (Liked)
          </h2>

          {loading ? (
            <p>Loading posts...</p>
          ) : clickedPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clickedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={post.imageUrl || "https://via.placeholder.com/600x400"}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {post.description.slice(0, 100)}...
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
              No liked posts available.
            </p>
          )}

          {/* My Posts Section */}
          <h2
            ref={myPostsRef} // Attach the ref here
            className="text-3xl font-bold mb-6 text-gray-900 dark:text-white mt-12"
          >
            My Posts
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
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {post.description.slice(0, 100)}...
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
              You haven't made any posts yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
