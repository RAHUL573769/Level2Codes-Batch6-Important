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
      {data.map((singleData=><div key={singleData.id} className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>))}
    </div>
  );
};

export default Page;
