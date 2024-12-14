import { sUser } from "@/store";
import SideBar from "../components/admin/SideBar";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  const curUser = localStorage.getItem('_id') || sessionStorage.getItem('_id');
  const findUser = sUser.value.users.find(user => user._id === curUser);
  if(!findUser) {
    return <Navigate to='/login' />
  }
  if(findUser.isAdmin === false) {
    return <Navigate to='/login' />
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
