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
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [clickedPosts, setClickedPosts] = useState([]); // For liked posts
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [editPost, setEditPost] = useState(null); // For editing posts
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

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

  // Handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  // Handle editing a post
  const handleEditPost = (post) => {
    setEditPost(post);
    setNewTitle(post.title);
    setNewDescription(post.description);
  };

  const handleSaveEdit = async () => {
    try {
      const postRef = doc(db, "posts", editPost.id);
      await updateDoc(postRef, {
        title: newTitle,
        description: newDescription,
      });
      setPosts(
        posts.map((post) =>
          post.id === editPost.id
            ? { ...post, title: newTitle, description: newDescription }
            : post
        )
      );
      setEditPost(null); // Close the modal after saving
    } catch (error) {
      console.error("Error updating post: ", error);
    }
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

                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
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

      {/* Edit Post Modal */}
      {editPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows="4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setEditPost(null)}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
