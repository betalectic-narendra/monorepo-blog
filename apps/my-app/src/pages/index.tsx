import React, { useContext, useEffect, useState } from "react";
import { getData } from "../helpers/apis";
interface Blog {}
function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const fetchData = async () => {
    try {
      const data = await getData("/blogs");
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {blogs.map((photo, index) => (
        <div
          key={index + photo?.name}
          className="mb-8 border-b border-gray-300 py-4 flex items-center"
        >
          <img
            className="w-24 h-24 object-cover rounded-full mr-4"
            src={photo?.slug}
            alt={photo?.name}
          />
          <div>
            <h2 className="text-xl font-semibold">{photo?.name}</h2>
            <p className="text-gray-600">{photo?.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
