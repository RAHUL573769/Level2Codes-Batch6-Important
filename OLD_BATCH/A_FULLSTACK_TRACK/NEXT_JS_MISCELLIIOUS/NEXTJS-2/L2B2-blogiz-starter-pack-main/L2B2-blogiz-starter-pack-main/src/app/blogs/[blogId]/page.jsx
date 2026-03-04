


// interface BlogId{
//     params: {
//         blogId:string
//     }
// }

export const generateStaticParams = async () => {
    const res = await fetch("http://localhost:9000/blogs")
    const blogs=await res.json()
    return blogs.map((blog) => {
        blogId:blog.id
    })
}
const BlogDetailPage = async({ params }) => {
    console.log(params)

    const res=await fetch(`http://localhost:9000/blogs/${params.blogId}`)
    const blog = await res.json()
    console.log(blog)
    return (
        <div>


        </div>
    );
};

export default BlogDetailPage;