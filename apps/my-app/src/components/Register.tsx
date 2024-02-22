import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { registerUser } from '@/helpers/apis';
interface Props {
  setRegisterUser: React.Dispatch<React.SetStateAction<boolean>>;
}
interface RegisterData{

}

const Register: React.FC<Props> = ({ setRegisterUser }) => {
  const [registerData, setRegisterData] = useState<RegisterData>({email:"",password:""});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser("/register",registerData);
      setRegisterUser(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };
  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl">Register</h2>
      <form onSubmit={handleSubmit} className="w-80">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={registerData?.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={registerData?.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg focus:outline-none focus:bg-blue-600">
          Register
        </button>
      </form>
      <button className="mt-4 text-blue-500 px-6 py-3 bg-white rounded-lg focus:outline-none" onClick={() => setRegisterUser(false)}>
        Go to Login
      </button>
    </div>
  );
};

export default Register;
