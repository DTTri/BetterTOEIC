import { Footer, Header } from "@/components";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ReactNode } from "react";
import { userService } from "@/services";
import { sUser } from "@/store";
import LoadingProgress from "@/components/LoadingProgress";

export default function UserLayout({
  children,
  haveHeader = true,
  haveFooter = true,
}: {
  children: ReactNode;
  haveHeader?: boolean;
  haveFooter?: boolean;
}) {
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
