import SendIcon from "@mui/icons-material/Send";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { franc } from 'franc';

interface TypeChatProps {
  handleAddMessage: (typedContent: string, languageCode?: 'vi' | 'en') => void;
  onHeightChange: (height: number) => void;
  isLoading?: boolean;
}

export default function TypeChat({
  handleAddMessage,
  onHeightChange,
  isLoading = false
}: TypeChatProps) {
  useEffect(() => {
    onHeightChange(100); // Set fixed height since we removed image preview
  }, [onHeightChange]);

  const handleDetectLanguage = (message: string) => {
    const result = franc(message, {
      only: ['eng', 'vie'],
      minLength: 3
    });
  
    return result === 'vie' ? 'vi' : 'en';
  }

  const handleOnSend = () => {
    if (isLoading) return;

    const message = document.querySelector("textarea") as HTMLTextAreaElement;
    if (message.value.trim() === "") {
      toast.error("Please enter a message before sending.");
      return;
    }

    const detectedLang = handleDetectLanguage(message.value);
    handleAddMessage(message.value, detectedLang as 'vi' | 'en');
    message.value = "";
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleOnSend();
    }
  };

  return (
    <div className="w-full rounded-3xl rounded-t-none border-t-[1px] border-t-slate-200 bg-[#fff] px-4 py-3 ">
      <div className="flex flex-row items-top gap-1">
        <textarea
          placeholder="Write your message"
          className="flex-1 border-0 text-sm text-[#000] font-bold px-1 focus:outline-none resize-none"
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          style={{
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? 'not-allowed' : 'text'
          }}
        />
        <SendIcon
          onClick={handleOnSend}
          color={isLoading ? "disabled" : "primary"}
          className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-slate-200'} rounded-full`}
        />
      </div>
    </div>
  );
}
