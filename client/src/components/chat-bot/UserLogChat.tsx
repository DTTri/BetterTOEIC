import Message from "@/entities/Message";

export default function UserLogChat({ message }: { message: Message }) {
  return (
    <div className="w-full flex flex-row justify-end mb-5">
      <div className="max-w-[80%] flex flex-col gap-1 items-end">
        <div className="flex flex-row gap-1">
          {message.images?.map((image, i) => (
            <img
              key={i}
              src={image}
              className="w-20 h-20 object-cover rounded-md"
            />
          ))}
        </div>
        <div className="bg-[#00205C] rounded-tl-[25px] rounded-b-[25px] text-white text-sm font-bold inline-flex items-center justify-center gap-2 p-2 px-[14px] break-words whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
}
