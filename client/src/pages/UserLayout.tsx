import { Footer, Header } from "@/components";
import { Navigate } from "react-router-dom";
import chatIcon from "../assets/chat_bot_icon.svg";
import LoadingProgress from "@/components/LoadingProgress";
import { sUser } from "@/store";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ReactNode, useState } from "react";
import Conversation from "@/components/chat-bot/Conversation";


export default function UserLayout({
  children,
  haveHeader = true,
  haveFooter = true,
  passAll = false,
  haveChatBot = true,
}: {
  children: ReactNode;
  haveHeader?: boolean;
  haveFooter?: boolean;
  passAll?: boolean;
  haveChatBot?: boolean;
}) {
  const [isOpenChatBot, setIsOpenChatBot] = useState<Boolean>(false);
  const handleOpenChatBot = () => {
    setIsOpenChatBot(!isOpenChatBot)
  }
  if (passAll) {
    return (
      <div className="w-full overflow-y-auto bg-gray-100">
        {haveChatBot && 
          <div onClick={handleOpenChatBot} className="fixed z-[1000] h-[60px] w-[60px] overflow-hidden rounded-full right-8 bottom-10 hover:shadow-md cursor-pointer">
            <img
              src={chatIcon}
              className="w-full h-full block object-cover object-center"
            />
          </div>
        }
        {
          (isOpenChatBot && haveChatBot) && <Conversation handleCloseChatBot={() => setIsOpenChatBot(false)}/>
        }
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
      {haveChatBot && 
        <div onClick={handleOpenChatBot} className="fixed z-[1000] h-[60px] w-[60px] overflow-hidden rounded-full right-8 bottom-10 hover:shadow-md cursor-pointer">
          <img
            src={chatIcon}
            className="w-full h-full block object-cover object-center"
          />
        </div>
      }
      {
        (isOpenChatBot && haveChatBot) && <Conversation handleCloseChatBot={() => setIsOpenChatBot(false)}/>
      }
      {haveHeader && <Header />}
      <div className="w-full min-h-screen h-full">{children}</div>
      {haveFooter && <Footer />}
    </div>
  );
}
