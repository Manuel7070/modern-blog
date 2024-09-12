import React, { useState, useEffect } from "react";
import BlogList from "../components/BlogList";
import Post from "../components/Post";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Firebase config file

export default function Blogs() {
  const [posts, setPosts] = useState([]); // State to hold blog posts
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch blog posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Start loading
      try {
        const querySnapshot = await getDocs(collection(db, "posts")); // Get all posts from Firestore
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); // Map the document data
        setPosts(postsData); // Set posts in state
      } catch (error) {
        console.error("Error fetching blog posts: ", error);
      }
      setLoading(false); // Stop loading
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Post /> {/* Component for creating new posts */}
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Latest Blog Posts</h1>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
    </>
  );
}
