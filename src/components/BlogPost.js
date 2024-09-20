import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the slug from the URL
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function BlogPost() {
  const { slug } = useParams(); // Get the slug from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const matchedPost = postList.find(
        (p) => p.title.toLowerCase().replace(/ /g, "-") === slug
      );

      if (matchedPost) {
        setPost(matchedPost);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img
        src={post.imageUrl || "https://via.placeholder.com/600x400"}
        alt={post.title}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-700 dark:text-gray-800 mb-4">
        {post.description}
      </p>
      <p className="text-gray-500 dark:text-gray-400">{post.date}</p>
    </div>
  );
}

export default BlogPost;
