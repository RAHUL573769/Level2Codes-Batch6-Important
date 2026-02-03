"use client";

import { useGetBlogsQuery } from "@/redux/api/baseApi";
import BlogCard from "../components/ui/BlogCard";

const BlogPage = () => {
  const { data: blogs = [], isLoading, isError, error } =
    useGetBlogsQuery("");

  if (isLoading) {
    return <p className="text-center">Loading blogs...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error loading blogs
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-4xl text-red-700 mb-6">
        Latest Blogs {blogs.length}
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
