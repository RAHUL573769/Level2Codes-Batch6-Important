import Image from "next/image";
import React from "react";

const Page = async() => {
    const result = await fetch("http://localhost:9000/comments", {
        cache: "force-cache",
        next:{revalidate:5}

    })
    const data = await result.json()
    console.log(data)
  return (
    <div>
      <Image
        src="https://cdn.cnn.com/cnnnext/dam/assets/230911101523-cnn-heroes-2023-super-tease.jpg"
        alt="CNN Heroes"
        width={500}
        height={300}
      />
    </div>
  );
};

export default Page;
