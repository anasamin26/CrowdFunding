import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ChatGPT from "../pages/ChatGPT";
const Layout = ({ children }) => {
  return (
    <div className="relative sm:-8 p-4  min-h-screen flex flex-row bg-[#13131a]">
      <div className="sm:flex-hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        {children}
      </div>
    </div>
  );
};
export default Layout;
