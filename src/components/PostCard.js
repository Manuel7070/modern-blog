import React from "react";

const PostCard = ({ image, title, description, date }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt="Blog Post" className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{date}</p>
        <p className="text-gray-700 mb-4">{description}</p>
        <a
          href="#"
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default PostCard;
