import { SideBar } from "@/components";

export default function OverallManagementPage() {
  return (
    <div className="w-full h-screen bg-background flex gap-4">
      <SideBar />
      <div className="w-full h-screen p-4">Tổng quan</div>
    </div>
  );
}
