import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";

function Home() {
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const fetchPhotos = () => {
    console.log("asd",`${process.env.NEXT_PUBLIC_API_URL}/photos`)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/photos`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPhotos(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchPhotos();
  }, []);
  const handleDelete = (uuid:string) => {
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
  {photos.map((photo, index) => (
    <div key={index + photo?.name} className="mb-8 border-b border-gray-300 py-4 flex items-center">
    <img className="w-24 h-24 object-cover rounded-full mr-4" src={photo?.slug} alt={photo.name} />
    <div>
      <h2 className="text-xl font-semibold">{photo?.name}</h2>
      <p className="text-gray-600">{photo?.tenant}</p>
    </div>
  </div>
  ))}
</div>

  );
}

export default Home;
