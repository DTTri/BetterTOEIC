import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import ForumIcon from "@mui/icons-material/Forum";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
const menuItems = [
  {
    name: "Overall",
    path: "/admin/",
    icon: <LeaderboardIcon />,
  },
  {
    name: "Test",
    path: "/admin/test",
    icon: <AssignmentIcon />,
  },
  {
    name: "Practice",
    path: "/admin/practice",
    icon: <DriveFileRenameOutlineIcon />,
  },
  {
    name: "Vocabulary",
    path: "/admin/vocab",
    icon: <FormatColorTextIcon />,
  },
  {
    name: "Roadmap",
    path: "/admin/roadmap",
    icon: <EditRoadIcon />,
  },
  {
    name: "Forum",
    path: "/admin/forum",
    icon: <ForumIcon />,
  },
  {
    name: "User",
    path: "/admin/user",
    icon: <PersonIcon />,
  },
];
export default function SideBar() {
  const nav = useNavigate();
  const [active, setActive] = useState("Overall");
  const location = window.location.pathname;
  useEffect(() => {
    const activePath = menuItems.find((item) => item.path === location);
    if (activePath) {
      setActive(activePath.name);
    }
  }, [location]);
  return (
    <div
      className="sidebar w-[200px] bg-white
    shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out mr-4
    "
    >
      <div className="menu-item-list w-full flex flex-col items-start">
        {menuItems.map((item) => (
          <Button
            key={item.name}
            startIcon={item.icon}
            onClick={() => {
              nav(item.path);
            }}
            variant="text"
            style={{
              width: "100%",
              justifyContent: "flex-start",
              textTransform: "none",
              color: "black",
              fontSize: "16px",
              fontWeight: "initial",
              paddingInlineStart: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              backgroundColor: active === item.name ? "#f0f0f0" : "white",
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
