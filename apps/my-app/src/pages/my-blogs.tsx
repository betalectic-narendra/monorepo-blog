import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { getUserData, deleteData } from "@/helpers/apis";
function MyBlogs() {
  usePrivateRoute();
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const blogs = await getUserData(`/user-blogs`, user.token);
      setBlogs(blogs);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (uuid: string) => {
    await deleteData(`/blogs/${uuid}`, user.token);
    alert("Blog deleted successfully.");
    fetchBlogs();
  };
  
  return (
    <div>
      {blogs?.length > 0 &&
        blogs?.map((blog, index) => (
          <div
            key={index + blog?.name}
            className="mb-8 border-b border-gray-300 py-4 flex items-center"
          >
            <img
              className="w-24 h-24 object-cover rounded-full mr-4"
              src={blog?.slug}
              alt={blog?.name}
            />
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">{blog?.name}</h2>
              <div className="flex mt-2">
                <Link
                  href={`/edit/${blog?.uuid}`}
                  className="text-blue-500 mr-4 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog?.uuid)}
                  className="bg-red-500 text-white rounded px-3 py-1 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyBlogs;
