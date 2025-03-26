'use client';
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("Title and content cannot be empty!");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/blogs", { title, content });
      router.push("/");
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">✍️ Create a Blog Post</h1>
        
        <input
          type="text"
          placeholder="Enter Blog Title"
          className="border p-3 w-full mb-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <ReactQuill 
          value={content} 
          onChange={setContent} 
          className="mb-4" 
        />

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold px-5 py-2 rounded-lg shadow-md"
          onClick={handleSubmit}
        >
          📢 Publish
        </button>
      </div>
    </div>
  );
};

export default CreatePost;