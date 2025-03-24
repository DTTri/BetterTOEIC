import * as motion from "motion/react-client";
import RemoveIcon from "@mui/icons-material/Remove";
import Message, { Role } from "@/entities/Message";
import ChatData from "./Chat_Data";
import { useEffect, useState } from "react";
import UserLogChat from "./UserLogChat";
import BotLogChat from "./BotLogChat";

export default function Conversation({
  messages = ChatData,
  handleCloseChatBot,
}: {
  messages?: Message[];
  handleCloseChatBot: () => void;
}) {
  //messages is a sample data
  const [messagesState, setMessagesState] = useState<Message[]>();

  useEffect(() => {
    setMessagesState(messages);
  }, []);

  return (
    <motion.div
      initial={{ x: 150, y: 200, scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "tween" }}
      whileInView={{ x: -85, y: 0, scale: 1 }}
      exit={{ x: 150, y: 200, scale: 0 }}
      className="fixed z-[2000] right-0 bottom-6 w-[450px] h-[600px] bg-[#fff] rounded-[40px] shadow-md shadow-slate-400"
    >
      <div className="title h-[15%] flex flex-row items-center py-4 px-6  border-b-[1px] border-b-slate-200">
        <RemoveIcon
          onClick={handleCloseChatBot}
          className="hover:shadow-md hover:shadow-slate-300 rounded-full"
          style={{ width: 24, height: 24, color: "#000000" }}
          fontSize="large"
        />
        <h3 className="ml-5 font-extrabold text-3xl text-[#000000]">
          Chat bot
        </h3>
      </div>
      <div className="conversation h-[85%] flex flex-col w-full p-5 gap-5 h overflow-auto">
        {messages?.map((message, i) =>
          message.role === Role.User ? (
            <UserLogChat key={i} message={message.content} />
          ) : (
            <BotLogChat key={i} message={message.content} />
          )
        )}
      </div>
    </motion.div>
  );
}
