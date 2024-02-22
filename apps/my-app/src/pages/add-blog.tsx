import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { postData } from "@/helpers/apis";
interface Blog {
  name: string;
  slug: string;
  content: string;
}

const AddBlog: React.FC = () => {
  usePrivateRoute();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState<Blog>({ name: "", slug: "", content: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await postData("/blogs", blog, user.token);
      alert("Photo Added Successfully");
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
            className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
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
            className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tenant" className="block mb-1">
            Tenant:
          </label>
          <input
            type="text"
            id="content"
            name="content"
            value={blog?.tenant}
            onChange={handleChange}
            className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
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
};

export default AddBlog;
