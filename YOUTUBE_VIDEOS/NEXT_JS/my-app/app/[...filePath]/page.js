import React from 'react';

const Blog = async({ params }) => {
    console.log(await params)

    const {filePath}=await params
    return (
        <div>
            <h1>File:<h1>{filePath.join("/")}</h1></h1>
        </div>
    );
};

export default Blog;