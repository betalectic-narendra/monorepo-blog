import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";
import usePrivateRoute from "@/hooks/usePrivateRoute";

function MyBlogs() {
    usePrivateRoute();
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const fetchPhotos = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-photos`,{
        method:"POST",
        headers:{
           "Content-type":"application/json"
        },
        body:JSON.stringify({
            creator_user_uuid:user?.uuid
        })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res",res);
        setPhotos(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchPhotos();
  }, []);
  const handleDelete = (uuid: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/photos/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((res) => {
        fetchPhotos();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
  {photos?.length > 0 && photos?.map((photo, index) => (
    <div
      key={index + photo?.name}
      className="mb-8 border-b border-gray-300 py-4 flex items-center"
    >
      <img
        className="w-24 h-24 object-cover rounded-full mr-4"
        src={photo?.slug}
        alt={photo.name}
      />
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">{photo?.name}</h2>
        <div className="flex mt-2">
          <Link
            href={`/edit/${photo?.uuid}`}
            className="text-blue-500 mr-4 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(photo?.uuid)}
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
