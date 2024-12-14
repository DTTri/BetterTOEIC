import { sUser } from "@/store";
import SideBar from "../components/admin/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import LoadingProgress from "@/components/LoadingProgress";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const [redirect, setRedirect] = useState(false);
  const findUser = sUser.use((state) => state.info);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const curUserId = localStorage.getItem("_id") || sessionStorage.getItem("_id");
  if (!token || !curUserId) {
    sUser.reset();
    return <Navigate to="/login" />;
  }
    useEffect(() => {
      const timer = setTimeout(() => {
        if (!findUser._id) {
          setRedirect(true);
        }
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [findUser._id]);
  
    if (redirect) {
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
