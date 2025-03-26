'use client';
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";

// Import Quill.js dynamically (Only on Client Side)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const BlogEditor = ({ initialTitle = "", initialContent = "", blogId = null }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("Title and content cannot be empty!");
      return;
    }

    try {
      if (blogId) {
        // If blogId exists, update the blog
        await axios.put(`http://localhost:8080/api/blogs/${blogId}`, { title, content });
      } else {
        // Else, create a new blog
        await axios.post("http://localhost:8080/api/blogs", { title, content });
      }

      router.push("/");
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{blogId ? "Edit Blog" : "Create a Blog Post"}</h1>

      {/* Title Input */}
      <input
        type="text"
        placeholder="Enter Blog Title"
        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* QuillJS Editor */}
      <ReactQuill value={content} onChange={setContent} className="mb-4 border rounded-lg" />

      {/* Submit Button */}
      <button
        className="bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold px-6 py-3 rounded-lg shadow-md w-full mt-4"
        onClick={handleSubmit}
      >
        {blogId ? "Update Blog" : "Publish Blog"}
      </button>
    </div>
  );
};

export default BlogEditor;