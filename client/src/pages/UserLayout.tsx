import { Footer, Header } from "@/components";
import { Navigate } from "react-router-dom";

import LoadingProgress from "@/components/LoadingProgress";
import { sUser } from "@/store";
import { ReactNode } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function UserLayout({
  children,
  haveHeader = true,
  haveFooter = true,
  passAll = false,
}: {
  children: ReactNode;
  haveHeader?: boolean;
  haveFooter?: boolean;
  passAll?: boolean;
}) {
  if (passAll) {
    return (
      <div className="w-full overflow-y-auto bg-gray-100">
        {haveHeader && <Header />}
        <div className="w-full min-h-screen h-full">{children}</div>
        {haveFooter && <Footer />}
      </div>
    );
  }
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
  console.log("id 2" + findUser._id);
  console.log("id 1" + curUserId);
  if (findUser._id !== curUserId) {
    sUser.reset();
    return <Navigate to="/login" />;
  }
  return (
    <div className="w-full overflow-y-auto bg-gray-100">
      {haveHeader && <Header />}
      <div className="w-full min-h-screen h-full">{children}</div>
      {haveFooter && <Footer />}
    </div>
  );
}
