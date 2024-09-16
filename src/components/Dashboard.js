import React, { useState, useEffect } from "react";
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

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [clickedPosts, setClickedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const postsQuery = query(
          collection(db, "posts"),
          where("userId", "==", user.uid)
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

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "posts", postId));
        setPosts(posts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const postRef = doc(db, "posts", selectedPost.id);
      await updateDoc(postRef, {
        title: selectedPost.title,
        description: selectedPost.description,
      });
      setPosts(
        posts.map((post) => (post.id === selectedPost.id ? selectedPost : post))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost({ ...selectedPost, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        <div className="w-64 bg-white dark:bg-gray-800 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <ul>
            <li className="mb-4">
              <a
                href="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:underline"
              >
                My Posts
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
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
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x400";
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
              No liked posts available.
            </p>
          )}

          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white mt-12">
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
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x400";
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
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleEdit(post)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Edit Post
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={selectedPost.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={selectedPost.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
