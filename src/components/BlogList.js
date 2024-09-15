import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function BlogList({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const openModal = async (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);

    // Log the post click event
    if (user) {
      try {
        await setDoc(
          doc(db, "userInteractions", user.uid),
          {
            [post.id]: {
              timestamp: new Date(),
              title: post.title,
              description: post.description,
              date: post.date,
              imageUrl: post.imageUrl,
            },
          },
          { merge: true }
        );
        console.log("Post click event logged");
      } catch (error) {
        console.error("Error logging post click event: ", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openModal(post)}
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

      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {selectedPost.title}
            </h2>
            <img
              src={
                selectedPost.imageUrl || "https://via.placeholder.com/600x400"
              }
              alt={selectedPost.title}
              className="w-full h-64 object-cover mb-4"
            />
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedPost.description}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {selectedPost.date}
            </p>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogList;
