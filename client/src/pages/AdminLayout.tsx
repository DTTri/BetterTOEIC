import SideBar from "../components/admin/SideBar";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="h-screen w-full overflow-y-auto flex justify-between bg-gray-100">
      <SideBar />
      <div className="w-full h-full p-2">
        <Outlet />
      </div>
    </div>
  );
}
