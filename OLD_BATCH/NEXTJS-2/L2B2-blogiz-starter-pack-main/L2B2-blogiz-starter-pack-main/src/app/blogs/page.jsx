import React from 'react';
import BlogCard from '../components/ui/BlogCard';

const BlogPage = async () => {
  const result = await fetch("http://localhost:9000/blogs", {
cache:"no-store",
  })
  const blogs = await result.json()
  console.log(blogs)
    return (
        <div>
 <h1 className="text-4xl text-red-700">
                Latest Blogs {blogs.length}
<div className="grid grid-cols-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      </h1>
        </div>
    );
};

export default BlogPage;