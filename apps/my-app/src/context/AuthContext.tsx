import { useRouter } from "next/router";
import React, { createContext, useState, ReactNode, use } from "react";

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
  const router=useRouter();
  const login = (user: User) => {
    console.log(user);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    router.push("/login")
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
