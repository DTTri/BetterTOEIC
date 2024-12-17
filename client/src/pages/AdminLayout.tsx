import LoadingProgress from "@/components/LoadingProgress";
import { sUser } from "@/store";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/admin/SideBar";

export default function AdminLayout() {
  const findUser = sUser.use((state) => state.info);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const curUserId = localStorage.getItem("_id") || sessionStorage.getItem("_id");
  if (!token || !curUserId) {
    sUser.reset();
    return <Navigate to="/login" />;
  }
  
  if(!findUser._id) {
    return <LoadingProgress />
  }
  if (findUser._id !== curUserId) {
    sUser.reset();
    return <Navigate to="/login" />;
  }
  if(!findUser.isAdmin) {
    return <Navigate to='/error'  state={ { errorType: 'not-authenticated' } }/>
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
