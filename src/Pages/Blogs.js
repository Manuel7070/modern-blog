import React from "react";
import BlogList from "../components/BlogList";
import Post from "../components/Post";
import Footer from "../components/Footer";

export default function Blogs() {
  const posts = [
    {
      image: "https://via.placeholder.com/600x400",
      title: "How to Create Responsive Websites",
      description:
        "In this blog, we will discuss how to create responsive websites using modern CSS techniques.",
      date: "September 12, 2024",
    },
    {
      image: "https://via.placeholder.com/600x400",
      title: "Understanding React Hooks",
      description:
        "A comprehensive guide to understanding and using React Hooks in your projects.",
      date: "September 10, 2024",
    },
    {
      image: "https://via.placeholder.com/600x400",
      title: "Tailwind CSS Best Practices",
      description:
        "Learn how to effectively use Tailwind CSS for creating sleek, modern designs.",
      date: "September 9, 2024",
    },
  ];

  return (
    <>
      <Post />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Latest Blog Posts</h1>
        <BlogList posts={posts} />
      </div>
    </>
  );
}
