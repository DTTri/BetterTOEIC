import * as motion from "motion/react-client";
import RemoveIcon from "@mui/icons-material/Remove";
import Message, { Role } from "@/entities/Message";
import ChatData from "./Chat_Data";
import { useEffect, useRef, useState } from "react";
import UserLogChat from "./UserLogChat";
import BotLogChat from "./BotLogChat";
import TypeChat from "./TypeChat";
import chatService from "@/services/chatService";
import { toast } from "react-toastify";
import { sUser } from "@/store";

export default function Conversation({
  handleCloseChatBot,
}: {
  handleCloseChatBot: () => void;
}) {
  const user = sUser.use((state) => state.info);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typeChatHeight, setTypeChatHeight] = useState<number>(50);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history when component mounts and user exists
  useEffect(() => {
    if (user?._id) {
      const loadChatHistory = async () => {
        try {
          const response = await chatService.getChatHistory(user._id);

          if (response.EC == 0) {
            setMessages(response.DT.chats);
          }
          else{
            toast.error("Failed to load chat history");
          }
        } catch (error) {
          console.error("Failed to load chat history:", error);
          toast.error("Failed to load chat history");
        }
      };

      loadChatHistory();
    }
  }, [user?._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddMessage = async (
    typedContent: string,
    languageCode: "vi" | "en" = "en"
  ) => {
    if (!typedContent.trim()) return;

    // Add user message immediately
    const newUserMessage: Message = {
      role: Role.User,
      content: typedContent,
      created_At: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      setIsLoading(true);
      const response = await chatService.sendMessage(
        typedContent,
        languageCode,
        user?._id
      );

      if (response.EC === 0 && response.DT) {
        // Add bot response
        const botMessage: Message = response.DT as Message;
        setMessages((prev) => [...prev, botMessage]);
      } else {
        toast.error("Failed to get response from bot");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
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
        <h3 className="ml-5 font-extrabold text-3xl text-[#000000]">
          Chat bot
        </h3>
      </div>
      <div
        className="conversation flex flex-col w-full p-5 overflow-auto"
        style={{ height: `calc(100% - ${typeChatHeight}px - 30px)` }}
      >
        {messages.map((message, i) =>
          message.role === Role.User ? (
            <UserLogChat key={i} message={message} />
          ) : (
            <BotLogChat key={i} message={message} />
          )
        )}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-bounce">...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <TypeChat
        onHeightChange={handleHeightChange}
        handleAddMessage={handleAddMessage}
        isLoading={isLoading}
      />
    </motion.div>
  );
}
