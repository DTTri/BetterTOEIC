import { useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import ForumIcon from "@mui/icons-material/Forum";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/",
    icon: <DashboardIcon />,
    description: "Overview & Analytics",
  },
  {
    name: "Tests",
    path: "/admin/test",
    icon: <AssignmentIcon />,
    description: "Manage TOEIC Tests",
  },
  {
    name: "Practice",
    path: "/admin/practice",
    icon: <DriveFileRenameOutlineIcon />,
    description: "Practice Exercises",
  },
  {
    name: "Vocabulary",
    path: "/admin/vocab",
    icon: <FormatColorTextIcon />,
    description: "Word Collections",
  },
  {
    name: "Roadmap",
    path: "/admin/roadmap",
    icon: <EditRoadIcon />,
    description: "Learning Paths",
  },
  {
    name: "Forum",
    path: "/admin/forum",
    icon: <ForumIcon />,
    description: "Community Posts",
  },
  {
    name: "Users",
    path: "/admin/user",
    icon: <PersonIcon />,
    description: "User Management",
  },
];
export default function SideBar() {
  const nav = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("admin-sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const location = window.location.pathname;

  useEffect(() => {
    const activePath = menuItems.find((item) => item.path === location);
    if (activePath) {
      setActive(activePath.name);
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem(
      "admin-sidebar-collapsed",
      JSON.stringify(isCollapsed)
    );
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="sidebar h-full bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 shadow-xl relative">
      <button
        onClick={toggleSidebar}
        className=" bg-white shadow-md mx-auto rounded-full text-gray-600 hover:text-gray-800 flex-shrink-0 absolute -right-3 top-2 z-10"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {isCollapsed ? (
            <MenuIcon className="text-lg" />
          ) : (
            <ChevronLeftIcon className="text-lg" />
          )}
        </motion.div>
      </button>

      <div className={`space-y-2 py-2 ${isCollapsed ? "px-2" : "px-4"}`}>
        {menuItems.map((item) => {
          const isActive = active === item.name;
          return (
            <div key={item.name} className="relative">
              <motion.button
                onClick={() => nav(item.path)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  padding: isCollapsed ? "12px" : "16px",
                  width: isCollapsed ? "48px" : "220px",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  gap: isCollapsed ? "0px" : "16px",
                }}
                transition={{
                  duration: 0.3,
                }}
                className={`
                  flex items-center rounded-xl relative overflow-hidden
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0">
                  {item.icon}
                </div>

                {!isCollapsed && (
                  <div className="flex-1 text-left overflow-hidden min-w-0">
                    <div className="font-semibold text-sm whitespace-nowrap">
                      {item.name}
                    </div>
                    <div className="text-xs whitespace-nowrap">
                      {item.description}
                    </div>
                  </div>
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
