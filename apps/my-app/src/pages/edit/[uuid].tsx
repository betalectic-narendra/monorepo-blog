import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { AuthContext } from "@/context/AuthContext";
import { getUserData, putData } from "../../helpers/apis";
interface Blog {}
function EditBlog() {
  usePrivateRoute();
  const {
    query: { uuid },
  } = useRouter();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState<Blog>({});
  const fetchBlog = async () => {
    try {
      const blog = await getUserData(`/blogs/${uuid}`, user.token);
      setBlog(blog);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await putData(`/blogs/${uuid}`, blog, user.token);
      alert("Blog updated Successfully");
      setBlog(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  return (
    <div className="flex items-center justify-center">
      <img
        alt={blog?.name}
        src={blog?.slug}
        className="h-48 w-48 object-cover"
      />

      <form onSubmit={handleSubmit} className="ml-4">
        <div className="mb-4">
          <label htmlFor="slug" className="block mb-1">
            Slug Url:
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={blog?.slug}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={blog?.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-1">
            Tenant:
          </label>
          <input
            type="text"
            id="content"
            name="content"
            value={blog?.content}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
