import Message from "@/entities/Message";
import chat_bot from "../../assets/chat_bot_icon.svg";

export default function BotLogChat({
  message,
}: {
  message: Message;
}) {
  return (
    <div className="max-w-[88%] flex flex-row items-end justify-start gap-2">
      <div className="w-[8%] h-6 rounded-full">
        <img
          src={chat_bot} className="w-full h-full object-contain"/>
      </div>
      <div
        className={`bg-[#F6F6F6] max-w-[90%] rounded-tr-[25px] rounded-t-[25px] mb-2 inline-flex items-center justify-center p-2 px-[14px]`}>
        <div className={`text-[#4B4B4B] text-sm font-bold break-words  whitespace-pre-wrap`}>
         {message.content}
        </div>
      </div>
    </div>
  );
}
