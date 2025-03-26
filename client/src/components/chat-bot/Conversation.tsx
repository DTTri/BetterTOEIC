import * as motion from "motion/react-client";
import RemoveIcon from "@mui/icons-material/Remove";
import Message, { Role } from "@/entities/Message";
import ChatData from "./Chat_Data";
import { useEffect, useRef, useState } from "react";
import UserLogChat from "./UserLogChat";
import BotLogChat from "./BotLogChat";
import TypeChat from "./TypeChat";

export default function Conversation({
  messages = ChatData,
  handleCloseChatBot,
}: {
  messages?: Message[];
  handleCloseChatBot: () => void;
}) {
  // messages is a sample data
  const [messagesState, setMessagesState] = useState<Message[]>([]);
  const [typeChatHeight, setTypeChatHeight] = useState<number>(50); // Default height
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessagesState(messages);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messagesState]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddMessage = (typedContent: string, images: File[]) => {
    const newMessages = [
      ...messagesState,
      {
        role: Role.User,
        content: typedContent,
        created_At: new Date().toISOString(),
      },
    ];

    images.forEach((image) => {
      newMessages.push({
        role: Role.User,
        content: URL.createObjectURL(image),
        created_At: new Date().toISOString(),
      });
    });

    setMessagesState(newMessages);
  };

  const handleHeightChange = (height: number) => {
    setTypeChatHeight(height);
  };

  return (
    <motion.div
      initial={{ x: 150, y: 200, scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "tween" }}
      whileInView={{ x: -85, y: 0, scale: 1 }}
      exit={{ x: 150, y: 200, scale: 0 }}
      className="fixed z-[2000] right-0 bottom-6 w-[450px] h-[600px] bg-[#fff] rounded-[40px] shadow-md shadow-slate-400 overflow-hidden"
    >
      <div className="title h-[10%] flex flex-row items-center py-4 px-6 border-b-[1px] border-b-slate-200">
        <RemoveIcon
          onClick={handleCloseChatBot}
          className="hover:shadow-md hover:shadow-slate-300 rounded-full"
          style={{ width: 24, height: 24, color: "#000000" }}
          fontSize="large"
        />
        <h3 className="ml-5 font-extrabold text-3xl text-[#000000]">Chat bot</h3>
      </div>
      <div
        className="conversation flex flex-col w-full p-5 overflow-auto"
        style={{ height: `calc(100% - ${typeChatHeight}px - 30px)` }} // Adjust height based on TypeChat height
      >
        {messagesState?.map((message, i) =>
          message.role === Role.User ? (
            <UserLogChat key={i} message={message} />
          ) : (
            <BotLogChat key={i} message={message} />
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <TypeChat onHeightChange={handleHeightChange}  handleAddMessage={handleAddMessage}  />
    </motion.div>
  );
}