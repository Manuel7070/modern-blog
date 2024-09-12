import React, { useState } from "react";
import { PhotographIcon } from "@heroicons/react/outline";
import { storage, db } from "../firebase/firebase"; // Firebase config file
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Post() {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePostSubmit = async () => {
    if (postContent) {
      setIsUploading(true);
      let imageDownloadUrl = "";

      try {
        if (image) {
          const imageRef = ref(storage, `images/${image.name}`);
          const uploadTask = uploadBytesResumable(imageRef, image);

          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => reject(error),
              async () => {
                try {
                  imageDownloadUrl = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );
                } catch (urlError) {
                  console.error("Error getting image URL: ", urlError);
                }
                resolve();
              }
            );
          });
        }

        await addDoc(collection(db, "posts"), {
          content: postContent,
          imageUrl: imageDownloadUrl || null,
          timestamp: serverTimestamp(),
        });

        setPostContent("");
        setImage(null);
        setIsUploading(false);
        console.log("Post successfully added!");
      } catch (error) {
        setIsUploading(false);
        console.error("Error adding post: ", error);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md max-w-xl mx-auto mb-6">
      <div className="flex items-start space-x-3">
        <img
          className="w-10 h-10 rounded-full"
          src="/images/profile.png"
          alt="User Avatar"
        />

        <textarea
          className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-3 resize-none border-0 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          rows="3"
          placeholder="What do you want to talk about?"
          value={postContent}
          onChange={handlePostChange}
        />
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex space-x-4">
          <label className="flex items-center space-x-1 text-blue-500 dark:text-blue-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer">
            <PhotographIcon className="w-5 h-5" />
            <span className="text-sm">Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <button
          onClick={handlePostSubmit}
          disabled={!postContent || isUploading}
          className={`px-4 py-2 text-white font-semibold rounded-lg ${
            postContent && !isUploading
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          } ${isUploading ? "opacity-50" : ""}`}
        >
          {isUploading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

export default Post;
