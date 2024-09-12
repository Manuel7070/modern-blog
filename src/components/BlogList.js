import React from "react";
import PostCard from "./PostCard";

const BlogList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <PostCard
          key={index}
          image={post.image}
          title={post.title}
          description={post.description}
          date={post.date}
        />
      ))}
    </div>
  );
};

export default BlogList;
