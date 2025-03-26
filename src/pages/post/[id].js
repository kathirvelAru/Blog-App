'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";  
import axios from "axios";

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{blog.title}</h1>
        <div className="prose max-w-full text-gray-700" dangerouslySetInnerHTML={{ __html: blog.content }} />

        <button
          className="w-full bg-red-500 hover:bg-red-600 transition-all text-white font-bold px-5 py-2 rounded-lg shadow-md mt-4"
          onClick={async () => {
            try {
              await axios.delete(`http://localhost:8080/api/blogs/${id}`);
              router.push("/");
            } catch (error) {
              console.error("Error deleting blog post:", error);
            }
          }}
        >
          ❌ Delete Blog
        </button>
      </div>
    </div>
  );
};

export default BlogPost;