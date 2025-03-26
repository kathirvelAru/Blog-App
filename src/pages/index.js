'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/blogs");
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-tr from-teal-400 to-blue-500 flex flex-col justify-center items-center p-6">
            <div className="max-w-4xl w-full bg-white shadow-2xl rounded-xl p-6 text-center">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-6">📝 Blog Posts</h1>
                <div className="mb-6 flex justify-center">
                    <Link href="/create">
                        <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-bold px-8 py-3 rounded-lg shadow-md text-lg transform hover:scale-105">
                            ➕ Create New Blog
                        </button>
                    </Link>
                </div>
                {blogs.length === 0 ? (
                    <p className="text-gray-500">No blogs available. Create one!</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {blogs.map((blog, index) => (
                            <div
                                key={blog._id}
                                className="relative bg-white border border-gray-300 shadow-lg rounded-lg p-5 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="absolute top-2 left-2 bg-purple-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                                    {index + 1}
                                </span>
                                <Link href={`/post/${blog._id}`}>
                                    <h2 className="text-2xl font-semibold text-purple-600 cursor-pointer hover:underline mt-2 transition-all duration-300 hover:text-purple-800">
                                        {blog.title}
                                    </h2>
                                </Link>
                                <p className="text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) + "..." }} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
