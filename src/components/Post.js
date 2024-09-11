import React, { useState } from "react";
import {
  PhotographIcon,
  VideoCameraIcon,
  CalendarIcon,
  DocumentIcon,
} from "@heroicons/react/outline";

function Post() {
  const [postContent, setPostContent] = useState("");

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = () => {
    if (postContent) {
      console.log("Posting:", postContent);
      setPostContent("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-xl mx-auto mb-6">
      <div className="flex items-start space-x-3">
        <img
          className="w-10 h-10 rounded-full"
          src="/images/profile.png"
          alt="User Avatar"
        />

        <textarea
          className="w-full bg-gray-100 rounded-lg p-3 resize-none border-0 outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="What do you want to talk about?"
          value={postContent}
          onChange={handlePostChange}
        />
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-blue-500 hover:bg-gray-200 rounded-lg p-2">
            <PhotographIcon className="w-5 h-5" />
            <span className="text-sm">Photo</span>
          </button>
          <button className="flex items-center space-x-1 text-blue-500 hover:bg-gray-200 rounded-lg p-2">
            <VideoCameraIcon className="w-5 h-5" />
            <span className="text-sm">Video</span>
          </button>
        </div>
        <button
          onClick={handlePostSubmit}
          disabled={!postContent}
          className={`px-4 py-2 text-white font-semibold rounded-lg ${
            postContent
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default Post;
