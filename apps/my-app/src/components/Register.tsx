import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';

interface Props {
  setRegisterUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<Props> = ({ setRegisterUser }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useContext(AuthContext);
  const router=useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        console.log('Register successful!');
        let data = await response.json();
        login(data);
        router.push("/")
      } else {
        console.error('Register failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
