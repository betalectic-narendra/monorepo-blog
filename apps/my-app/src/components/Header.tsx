import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';

const Header = () => {
  const { user,logout } = useContext(AuthContext);
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold"> <Link href="/" className="nav-link">Home</Link></h1>
        <nav className="flex">
          <ul className="flex space-x-4">
            {user?.email &&
             <>
              <li className="nav-item">
                <Link href="/my-blogs" className="nav-link">My Blogs</Link>
              </li>
              <li className="nav-item">
                <Link href="/add-blogs" className="nav-link">Add Blogs</Link>
              </li>
             </>
            }
            <li className="nav-item">
              {((user?.email&&<button className="" onClick={logout}>Logout</button>)||<Link href="/login" className="nav-link">Login</Link>)}
              
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;


// {
//   "email":"narendra@betalectic.com",
//   "password":"verySecrective"
// }