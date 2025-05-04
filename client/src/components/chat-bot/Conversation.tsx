import * as motion from "motion/react-client";
import RemoveIcon from "@mui/icons-material/Remove";
import Message, { Role } from "@/entities/Chat";
import { useEffect, useRef, useState, useCallback } from "react";
import UserLogChat from "./UserLogChat";
import BotLogChat from "./BotLogChat";
import TypeChat from "./TypeChat";
import chatService from "@/services/chatService";
import { toast } from "react-toastify";
import { sChat, sUser } from "@/store";

export default function Conversation({
  handleCloseChatBot,
}: {
  handleCloseChatBot: () => void;
}) {
  const user = sUser.use((state) => state.info);
  const chat = sChat.use((state) => state.chatHistory);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [typeChatHeight, setTypeChatHeight] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const shouldScrollToBottomRef = useRef<boolean>(true);

  useEffect(() => {
    if (chat && chat.length > 0) {
      setMessages(chat);
      shouldScrollToBottomRef.current = true;
    }
  }, [chat]);

  const loadChatHistory = async (page: number) => {
    if (!user?._id) return;
    
    try {
      if (page === 1) {
        setIsLoading(true);
        shouldScrollToBottomRef.current = true;
      } else {
        setIsLoadingMore(true);
        shouldScrollToBottomRef.current = false;
        
        if (conversationRef.current) {
          prevScrollHeightRef.current = conversationRef.current.scrollHeight;
        }
      }

      const response = await chatService.getChatHistory(user._id, page, 10);

      if (response.EC === 0) {
        const newMessages = response.DT.chats;
        
        setMessages(prev => 
          page === 1 ? newMessages : [...newMessages, ...prev]
        );
        
        setCurrentPage(page);
        setHasMore(response.DT.pagination?.hasMore || false);
        
        if (page === 1) {
          sChat.set((prev) => (prev.value.chatHistory = newMessages));
        }
      } else {
        toast.error("Failed to load chat history");
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
      toast.error("Failed to load chat history");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (isLoadingMore === false && prevScrollHeightRef.current > 0 && conversationRef.current) {
      const newScrollHeight = conversationRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
      conversationRef.current.scrollTop = scrollDiff > 0 ? scrollDiff : 0;
      prevScrollHeightRef.current = 0;
    }
  }, [isLoadingMore, messages]);

  useEffect(() => {
    if (shouldScrollToBottomRef.current) {
      scrollToBottom();
    }
  }, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = useCallback(() => {
    if (!conversationRef.current || isLoadingMore || !hasMore) return;
    
    if (conversationRef.current.scrollTop < 50) {
      loadChatHistory(currentPage + 1);
    }
  }, [currentPage, isLoadingMore, hasMore]);

  const handleAddMessage = async (
    typedContent: string,
    languageCode: "vi" | "en" = "en"
  ) => {
    if (!typedContent.trim()) return;

    const newUserMessage: Message = {
      role: Role.User,
      content: typedContent,
      created_At: new Date().toISOString(),
    };

    shouldScrollToBottomRef.current = true;
    
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      setIsLoading(true);
      const responseChat = await chatService.sendMessage(
        typedContent,
        languageCode,
        user?._id
      );

      if (responseChat.EC === 0) {
        const botMessage: Message = responseChat.DT as Message;
        setMessages((prev) => [...prev, botMessage]);
        
        sChat.set((prev) => (prev.value.chatHistory = [...prev.value.chatHistory, newUserMessage, botMessage]));
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
      className="fixed z-[2000] right-0 bottom-6 w-[450px] h-[600px] bg-[#fff] rounded-[24px] shadow-md shadow-slate-400 overflow-hidden"
    >
      <div className="title flex flex-row items-center py-4 px-6 border-b-[1px] border-b-slate-200">
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
        ref={conversationRef}
        className="conversation flex flex-col w-full p-5 overflow-auto"
        style={{ height: `calc(100% - ${typeChatHeight}px - 30px)` }}
        onScroll={handleScroll}
      >
        {isLoadingMore && (
          <div className="flex justify-center py-2 mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        )}
        
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
