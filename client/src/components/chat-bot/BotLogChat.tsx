import Message from "@/entities/Chat";
import chat_bot from "../../assets/chat_bot_icon.svg";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "@mui/material";

export default function BotLogChat({ message }: { message: Message }) {
  const extractUrlAndText = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = content.match(urlRegex) || [];
    const text = content.replace(urlRegex, "").trim();
    return { text, urls };
  };

  const getRouteNameFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathSegments = urlObj.pathname.split("/").filter(Boolean);

      const routeName = pathSegments[0];

      const routeDisplayNames: { [key: string]: string } = {
        practice: "Practice",
        test: "Test",
        "vocab-gallery": "Vocabulary",
        "road-map": "Roadmap",
        forum: "Forum",
      };

      return routeDisplayNames[routeName] || routeName;
    } catch (error) {
      console.error("Invalid URL:", error);
      return "Link";
    }
  };

  const formatTextIntoBoldStyle = (text: string): (string | JSX.Element)[] => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts
      .map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const boldContent = part.substring(2, part.length - 2);
          return <strong className="text-gray-700" key={`bold-${index}`}>{boldContent}</strong>;
        }
        return part;
      })
      .filter(part => (typeof part === 'string' ? part.length > 0 : true));
  };

  const { text, urls } = extractUrlAndText(message.content);

  return (
    <div className="max-w-[88%] flex flex-row items-start justify-start gap-1 mb-2">
      <div className="w-[8%] h-6 rounded-full">
        <img
          src={chat_bot}
          className="w-full h-full object-contain"
          alt="Bot Avatar"
        />
      </div>
      <div className="flex flex-col max-w-[90%] gap-1">
        {/* Text Message */}
        {text && (
          <div className="bg-[#F6F6F6] rounded-tr-[25px] rounded-t-[25px] inline-flex items-start justify-center p-2 px-[14px]">
            <div className="text-[#4B4B4B] text-sm font-bold break-words whitespace-pre-wrap" style={{ wordBreak: "break-word", lineHeight: "1.5" }}>
              {formatTextIntoBoldStyle(text)}
            </div>
          </div>
        )}

        {/* URL Links */}
        {urls.length > 0 && (
          <div className="flex flex-col gap-2">
            {urls.map((url, index) => (
              <Link
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
              >
                <div className="bg-white border border-blue-200 rounded-lg p-3 hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2 max-w-full">
                  <OpenInNewIcon
                    className="text-blue-600 flex-shrink-0"
                    fontSize="small"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-blue-600 text-sm font-medium">
                      {getRouteNameFromUrl(url)}
                    </span>
                    <span className="text-gray-500 text-xs">Open document</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
