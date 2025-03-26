'use client';
import Link from "next/link";

const BlogList = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return <p className="text-gray-500 text-center">No blogs available. Create one!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => (
        <div
          key={blog._id}
          className="relative bg-white border border-gray-300 shadow-md rounded-lg p-5 hover:shadow-xl transition-all"
        >
          {/* Blog Number */}
          <span className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-sm">
            {index + 1}
          </span>

          <Link href={`/post/${blog._id}`}>
            <h2 className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline mt-2">
              {blog.title}
            </h2>
          </Link>
          <p className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) + "..." }} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;