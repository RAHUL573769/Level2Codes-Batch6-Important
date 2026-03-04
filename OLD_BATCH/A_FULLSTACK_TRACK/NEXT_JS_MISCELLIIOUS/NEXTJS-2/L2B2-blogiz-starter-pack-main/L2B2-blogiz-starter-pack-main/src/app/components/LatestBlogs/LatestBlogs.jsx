import LatestBlogCard from "../ui/LatestBlogCard";

;

const LatestBlogs = ({ blogs }) => {
  return (
    <div>
      <h1 className="text-4xl text-red-700">
        Latest Blogs {blogs.length}
      </h1>

      <div className="grid grid-cols-2">
        {blogs.map((blog) => (
          <LatestBlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
