import React, { useState } from "react";
import { PhotographIcon } from "@heroicons/react/outline";
import { storage, db } from "../firebase/firebase"; // Firebase config file
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // Import the auth context

function Post() {
  const { user } = useAuth(); // Get the current user from auth context
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePostSubmit = async () => {
    if (title && description && user) {
      // Ensure user is defined
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

        const currentDate = new Date().toLocaleDateString("en-CA");

        await addDoc(collection(db, "posts"), {
          title,
          description,
          date: currentDate,
          imageUrl: imageDownloadUrl || null,
          timestamp: serverTimestamp(),
          userId: user.uid,
        });

        setTitle("");
        setDescription("");
        setImage(null);
        setIsUploading(false);
        console.log("Post successfully added!");
      } catch (error) {
        setIsUploading(false);
        console.error("Error adding post: ", error);
      }
    } else {
      console.error("All fields are required and user must be logged in.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 mt-10 rounded-lg shadow-md max-w-xl mx-auto mb-6">
      <div className="flex flex-col space-y-3">
        <input
          className="bg-white-100 dark:bg-white-700 rounded-lg p-3 border-0 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className="bg-white-100 dark:bg-white-700 rounded-lg p-3 resize-none border-0 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          rows="3"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div className="flex justify-between items-center mt-3">
        <label className="flex items-center space-x-1 text-blue-500 dark:text-blue-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer">
          <PhotographIcon className="w-5 h-5" />
          <span className="text-sm">Header Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <button
          onClick={handlePostSubmit}
          disabled={!title || !description || isUploading}
          className={`px-4 py-2 text-white font-semibold rounded-lg ${
            title && description && !isUploading
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
