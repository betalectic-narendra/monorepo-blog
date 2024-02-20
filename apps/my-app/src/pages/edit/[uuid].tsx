import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePrivateRoute from '@/hooks/usePrivateRoute';
import { AuthContext } from '@/context/AuthContext';
interface Photo {
  slug: string;
  name: string;
  tenant:string
}

function EditPhoto() {
    usePrivateRoute()
    const {query:{uuid}} = useRouter();
    const {user}=useContext(AuthContext)


  const [photo, setPhoto] = useState<Photo>({ slug: '', name: '', tenant:'' });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/photo/${uuid}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setPhoto({...res,creator_user_uuid:user?.uuid});
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [uuid]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("photo",photo)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/photos/${uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(photo)
    })
      .then(res => res.json())
      .then(res => {
        alert("Photo Updated Successfully");
        setPhoto(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPhoto({ ...photo, [name]: value });
  };

  return (
    <div className="flex items-center justify-center">
  <img alt={photo.name} src={photo.slug} className="h-48 w-48 object-cover" />

  <form onSubmit={handleSubmit} className="ml-4">
    <div className="mb-4">
      <label htmlFor="slug" className="block mb-1">Slug Url:</label>
      <input
        type="text"
        id="slug"
        name="slug"
        value={photo.slug}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="name" className="block mb-1">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={photo.name}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="tenant" className="block mb-1">Tenant:</label>
      <input
        type="text"
        id="tenant"
        name="tenant"
        value={photo.tenant}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>
    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600">
      Submit
    </button>
  </form>
</div>

  );
}

export default EditPhoto;
