import React, { ReactNode, useContext, useEffect } from "react";
import Header from "./Header";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer>
      </footer>
    </div>
  );
};

export default Layout;
