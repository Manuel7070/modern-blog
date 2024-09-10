import React from "react";
import {
  PencilAltIcon,
  ChatAltIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";

const Features = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-900">
            Key Features of Our Blogging App
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Explore the powerful features that will help you become a top
            blogger.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <PencilAltIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Write and Edit Blogs</h3>
            <p className="text-gray-600">
              Create beautiful blog posts with our powerful editor. Save drafts
              and publish when you're ready.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <ChatAltIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Engage with Readers</h3>
            <p className="text-gray-600">
              Interact with your audience through comments, likes, and shares.
              Build a community around your content.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <ChartBarIcon className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Track Blog Performance</h3>
            <p className="text-gray-600">
              Monitor the success of your blog with real-time analytics on
              views, engagement, and growth trends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
