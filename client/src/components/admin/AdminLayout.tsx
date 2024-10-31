import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="h-screen w-full overflow-y-auto flex justify-between bg-gray-100">
      <SideBar />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
