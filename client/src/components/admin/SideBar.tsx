import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
export default function SideBar() {
  const nav = useNavigate();
  return (
    <div className="sidebar w-[240px] h-screen bg-white p-8">
      <div className="menu-item-list w-full mx-auto flex flex-col items-center gap-2">
        <Button
          className="menu-item w-full"
          onClick={() => nav("/admin/overall")}
        >
          Overall
        </Button>
        <Button className="menu-item w-full" onClick={() => nav("/admin/test")}>
          Test
        </Button>
        <Button
          className="menu-item w-full"
          onClick={() => nav("/admin/practice")}
        >
          Practice
        </Button>
        <Button
          className="menu-item w-full"
          onClick={() => nav("/admin/vocab")}
        >
          Vocabulary
        </Button>
        <Button
          className="menu-item w-full"
          onClick={() => nav("/admin/roadmap")}
        >
          Roadmap
        </Button>
        <Button
          className="menu-item w-full"
          onClick={() => nav("/admin/forum")}
        >
          Forum
        </Button>
        <Button className="menu-item w-full" onClick={() => nav("/admin/user")}>
          User
        </Button>
      </div>
    </div>
  );
}
{
  /* <Route path="/admin/overall" element={<OverallManagementPage />} />
      <Route path="/admin/tests" element={<TestManagementPage />} />
      <Route path="/admin/practices" element={<PracticeManagementPage />} />
      <Route path="/admin/roadmaps" element={<RoadmapManagementPage />} />
      <Route path="/admin/users" element={<UserManagementPage />} />
      <Route path="/admin/vocabs" element={<VocabManagementPage />} />
      <Route path="/admin/forums" element={<ForumManagementPage />} /> */
}
