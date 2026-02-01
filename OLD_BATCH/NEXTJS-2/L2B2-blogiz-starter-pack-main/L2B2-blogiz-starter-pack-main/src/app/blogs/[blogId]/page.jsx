


// interface BlogId{
//     params: {
//         blogId:string
//     }
// }
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