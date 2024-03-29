import React, { useContext, useState } from "react";
import Register from "../components/Register";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { loginUser } from "../helpers/apis";
interface LoginData {}
const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [registerUser, setRegisterUser] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser("/login", loginData);
      login(response);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  return registerUser ? (
    <Register setRegisterUser={setRegisterUser} />
  ) : (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-80">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={loginData?.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={loginData?.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>
      </form>
      <button
        className="mt-4 text-blue-500 px-6 py-3 bg-white rounded-lg focus:outline-none"
        onClick={() => setRegisterUser(true)}
      >
        Go to Register
      </button>
    </div>
  );
};

export default Login;
