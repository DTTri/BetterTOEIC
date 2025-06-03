import ChatMessage from "@/entities/Chat";
import { signify } from "react-signify";

const sChat = signify({
    chatHistory: [] as ChatMessage[],
})

export default sChat;