import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItemWithText,
  SelectTrigger,
} from "@/components/ui/select";
import { sUser } from "@/store";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo_BetterTOEIC.svg";
import LoadingProgress from "./LoadingProgress";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function Header() {
  const [selectedItem, setSelectedItem] = useState("");
  const [isTestOpen, setIsTestOpen] = useState(false);
  const nav = useNavigate();
  const location = useLocation();

  const userInfo = sUser.use((cur) => cur.info);
  useEffect(() => {
    const headerPaths = [
      "/log-out",
      "/user-info",
      "/user-report",
      "/test-saved",
      "/word-saved",
    ];
    if (!headerPaths.includes(location.pathname)) {
      setSelectedItem("");
    }
  }, [location.pathname]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isTestOpen) return;
      const target = event.target as HTMLElement;
      if (
        !target.closest("#test-dropdown") &&
        !target.closest(".test-button")
      ) {
        setIsTestOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside); // Cleanup on unmount
    };
  }, [isTestOpen]);
  // const [userInfo, setUserInfo] = useState<User>(user);

  // useEffect(() => {
  //   if(user._id !== '') {
  //     setUserInfo(user);
  //   }
  // }, [user._id]);

  if (!userInfo) {
    return <LoadingProgress />;
  }

  const handleItemChange = (e: string) => {
    setSelectedItem(e);
    switch (e) {
      case "log-out":
        localStorage.removeItem("token");
        localStorage.removeItem("_id");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("_id");
        sessionStorage.removeItem("state");
        sUser.reset();
        nav("/login");
        break;
      case "admin":
        nav("/admin");
        break;
      case "user-info":
        nav("/user-info");
        break;
      case "report":
        nav("/user-report");
        break;
      case "word-saved":
        nav("/word-saved");
        break;
      case "test-saved":
        nav("/test-saved");
        break;
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full px-6 py-2 shadow-sm border-b border-gray-100 sticky top-0 z-50"
      >
        <div className="max-w-[1440px] w-full flex flex-row justify-between items-center mx-auto">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/" className="flex items-center">
              <img
                className="w-[140px] h-auto object-contain"
                src={Logo}
                alt="BetterTOEIC"
              />
            </Link>
          </motion.div>

          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-2">
              {userInfo._id && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/road-map"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-semibold text-md"
                  >
                    Roadmap
                  </Link>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/test"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-semibold text-md"
                >
                  Tests
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/practice"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-semibold text-md"
                >
                  Practices
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/vocab-gallery"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-semibold text-md"
                >
                  Vocabulary
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/forum"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-semibold text-md"
                >
                  Forum
                </Link>
              </motion.div>

              {!userInfo._id && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 font-semibold text-sm shadow-sm"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </nav>

            {userInfo._id && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Select onValueChange={handleItemChange}>
                  <SelectTrigger
                    value={selectedItem}
                    className="flex flex-row w-auto gap-3 justify-between shadow-sm bg-white hover:bg-gray-50 h-auto py-2 px-3 border border-gray-200 rounded-lg transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      {userInfo.avatar ? (
                        <img
                          src={userInfo.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <Avatar
                          sx={{ width: 32, height: 32 }}
                          className="bg-gradient-to-br from-blue-500 to-blue-600"
                        >
                          <PersonIcon className="text-white text-sm" />
                        </Avatar>
                      )}
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-gray-800">
                          {userInfo.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {userInfo.isAdmin ? (
                            <span className="flex items-center gap-1">
                              Admin
                            </span>
                          ) : (
                            "User"
                          )}
                        </span>
                      </div>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <SelectGroup>
                        {userInfo.isAdmin && (
                          <SelectItemWithText
                            value="admin"
                            className="hover:bg-blue-50 hover:text-blue-700"
                          >
                            <AdminPanelSettingsIcon className="mr-2 text-sm" />
                            Admin Dashboard
                          </SelectItemWithText>
                        )}
                        <SelectItemWithText
                          value="report"
                          className="hover:bg-gray-50"
                        >
                          User Report
                        </SelectItemWithText>
                        <SelectItemWithText
                          value="user-info"
                          className="hover:bg-gray-50"
                        >
                          Profile Settings
                        </SelectItemWithText>
                        <SelectItemWithText
                          value="test-saved"
                          className="hover:bg-gray-50"
                        >
                          Saved Tests
                        </SelectItemWithText>
                        <SelectItemWithText
                          value="word-saved"
                          className="hover:bg-gray-50"
                        >
                          Saved Words
                        </SelectItemWithText>
                        <SelectItemWithText
                          value="log-out"
                          className="hover:bg-red-50 hover:text-red-700 border-t border-gray-100"
                        >
                          Sign Out
                        </SelectItemWithText>
                      </SelectGroup>
                    </motion.div>
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>
    </>
  );
}
