import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItemWithText,
  SelectTrigger,
} from "@/components/ui/select";
import { sUser } from "@/store";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo_BetterTOEIC.svg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LoadingProgress from "./LoadingProgress";
import * as motion from "motion/react-client";

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
  // const [userInfo, setUserInfo] = useState<User>(user);

  // useEffect(() => {
  //   if(user._id !== '') {
  //     setUserInfo(user);
  //   }
  // }, [user._id]);

  if (!userInfo) {
    return <LoadingProgress />;
  }

  console.log("userInfo:", userInfo); // Add this line to log userInfo

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

  const handleTestChange = (e: string) => {
    switch (e) {
      case "l&r":
        nav("/tests/l&r");
        break;
      case "s&w":
        nav("/tests/s&w");
        break;
    } 
  };

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if(!isTestOpen) return;
  //     const target = event.target as HTMLElement; // Type assertion to HTMLElement
  //     if (isTestOpen && !target.closest('#test-dropdown')) {
  //       setIsTestOpen(false);
  //     }
  //   };

  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside); // Cleanup on unmount
  //   };
  // }, [isTestOpen]);
  return (
    <>
      <header className=" bg-[#ffffff] w-full px-9 py-3 flex justify-center">
        <div className="max-w-[1440px] w-full flex flex-row justify-between  items-center">
          <Link to="/">
            <img
              className="flex justify-center max-w-full w-[128px] object-cover object-center ml-4"
              src={Logo}
              alt="BetterTOEIC"
            />
          </Link>
          <div className="right flex flex-row gap-[32px] items-center justify-center">
            <ul className="flex flex-row gap-[18px]">
              {userInfo._id && (
                <li>
                  <Link to="/road-map">
                    <Button
                      className="hover:bg-slate-100"
                      style={{
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "#000000",
                        fontFamily: "Nunito Sans",
                      }}
                      variant="text"
                      sx={{ textTransform: "none" }}
                    >
                      Roadmap
                    </Button>
                  </Link>
                </li>
              )}
              <li onClick={() => setIsTestOpen(!isTestOpen)} className="flex flex-row items-center justify-center cursor-pointer gap-1 relative hover:bg-slate-100">
                <Button
                  className="hover:bg-slate-100"
                  variant="text"
                  style={{
                    fontWeight: "700",
                    fontSize: "16px",
                    color: "#000000",
                    fontFamily: "Nunito Sans",
                  }}
                  sx={{ textTransform: "none" }}
                >
                  Tests
                </Button>
                {isTestOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
                {isTestOpen && (
                  <motion.div
                    id="test-dropdown"
                    initial={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      duration: 0.3,
                      scale: { type: "spring" },
                      opacity: { ease: "easeInOut" },
                    }}
                    
                    className="flex flex-col rounded-4 absolute top-full left-0 bg-white mt-1 w-[200px] shadow-md"
                  >
                    <div
                      className="hover:bg-slate-100 px-4 py-2 text-sm font-semibold"
                      onClick={() => handleTestChange("l&r")}
                    >
                      Listening & Reading
                    </div>
                    <div
                      className="hover:bg-slate-100 px-4 py-2 text-sm font-semibold"
                      onClick={() => handleTestChange("s&w")}
                    >
                      Speaking & Writing
                    </div>
                  </motion.div>
                )}
              </li>
              <li>
                <Link to="/practice">
                  <Button
                    className="hover:bg-slate-100"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "#000000",
                      fontFamily: "Nunito Sans",
                    }}
                    variant="text"
                    sx={{ textTransform: "none" }}
                  >
                    Practices
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/vocab-gallery">
                  <Button
                    className="hover:bg-slate-100"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "#000000",
                      fontFamily: "Nunito Sans",
                    }}
                    variant="text"
                    sx={{ textTransform: "none" }}
                  >
                    Vocabulary
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/forum">
                  <Button
                    className="hover:bg-slate-100"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "#000000",
                      fontFamily: "Nunito Sans",
                    }}
                    variant="text"
                    sx={{ textTransform: "none" }}
                  >
                    Forum
                  </Button>
                </Link>
              </li>
              {!userInfo._id && (
                <li>
                  <Link to="/login">
                    <Button
                      className="hover:bg-slate-100"
                      style={{
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "#000000",
                        fontFamily: "Nunito Sans",
                        borderColor: "#000000",
                        borderRadius: "10px",
                      }}
                      variant="outlined"
                      sx={{ textTransform: "none" }}
                    >
                      Login
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
            {/* { userInfo._id && (<div className="icon_noti">
            <button className='flex items-center justify-center'><img src={Noti} alt="" /></button>
          </div>)} */}
            {userInfo._id && (
              <Select onValueChange={handleItemChange}>
                <SelectTrigger
                  value={selectedItem}
                  className="flex flex-row w-auto gap-4 justify-between shadow-none bg-background h-auto py-1 px-2 border-none"
                >
                  <img
                    src={userInfo.avatar}
                    alt=""
                    className="max-h-10 max-w-10 aspect-square w-full h-full inline-block rounded-full object-fill"
                  />
                  <div className="flex flex-col">
                    <span className="text-[16px] font-semibold ">
                      {userInfo.name.split(" ")}
                    </span>
                    <span className="text-[12px] font-normal ">
                      {userInfo.isAdmin == true ? "Admin" : "User"}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <motion.div
                    initial={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      duration: 0.3,
                      scale: { type: "spring" },
                      opacity: { ease: "easeInOut" },
                    }}
                  >
                    <SelectGroup>
                      {userInfo.isAdmin && (
                        <SelectItemWithText value="admin">
                          Admin Dashboard
                        </SelectItemWithText>
                      )}
                      <SelectItemWithText value="report">
                        User report
                      </SelectItemWithText>
                      <SelectItemWithText value="user-info">
                        User-info
                      </SelectItemWithText>
                      <SelectItemWithText value="test-saved">
                        Test saved list
                      </SelectItemWithText>
                      <SelectItemWithText value="word-saved">
                        Word saved list
                      </SelectItemWithText>
                      <SelectItemWithText value="log-out">
                        Log out
                      </SelectItemWithText>
                    </SelectGroup>
                  </motion.div>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
