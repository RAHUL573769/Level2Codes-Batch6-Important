

import { useGetBlogsQuery } from '@/redux/api/baseApi';
import LatestBlogs from './components/LatestBlogs/LatestBlogs';
const HomePage = async () => {
  const result = await fetch("http://localhost:9000/blogs", {

    next: { revalidate: 10 }
  })
  const blogs = await result.json()
  console.log(blogs)


  return (
    <>
      <h1 className="text-center text-4xl my-5"><LatestBlogs blogs={blogs}></LatestBlogs></h1>



    </>
  );
};

export default HomePage;
