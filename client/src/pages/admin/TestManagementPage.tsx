import { SideBar } from "@/components";
import React from "react";

export default function TestManagementPage() {
  return (
    <div className="w-full h-screen bg-background flex gap-4">
      <SideBar />
      <div className="w-full h-screen p-4">Đề thi</div>
    </div>
  );
}
