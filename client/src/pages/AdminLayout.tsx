import SideBar from "../components/admin/SideBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="h-screen w-full overflow-y-auto flex justify-between bg-gray-100">
      <SideBar />
      <div className="w-full h-full p-2">
        <Outlet />
      </div>
    </div>
  );
}
