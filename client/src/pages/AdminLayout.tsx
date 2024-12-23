import LoadingProgress from "@/components/LoadingProgress";
import { sUser } from "@/store";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/admin/SideBar";
import { Header } from "@/components";
import * as motion from "motion/react-client";

export default function AdminLayout() {
  const findUser = sUser.use((state) => state.info);
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const curUserId =
    localStorage.getItem("_id") || sessionStorage.getItem("_id");
  if (!token || !curUserId) {
    sUser.reset();
    return <Navigate to="/login" />;
  }

  if (!findUser._id) {
    return <LoadingProgress />;
  }
  if (findUser._id !== curUserId) {
    sUser.reset();
    return <Navigate to="/login" />;
  }
  if (!findUser.isAdmin) {
    return <Navigate to="/error" state={{ errorType: "not-authenticated" }} />;
  }
  return (
    <div className="min-h-screen w-full overflow-y-auto flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <motion.div
          initial={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          className="w-full h-full m-2 rounded-xl p-4 flex flex-col gap-2 overflow-hidden bg-white"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
