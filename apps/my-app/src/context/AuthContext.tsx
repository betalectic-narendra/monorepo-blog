import { useRouter } from "next/router";
import React, { createContext, useState, ReactNode, use, useEffect } from "react";

interface User {
  email: string;
  name:string;
  token:string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);
  const router=useRouter();
  const login = (user: User) => {
    localStorage.setItem("user",JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user")
    router.push("/login")
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
