
export default function UserLogChat({ message }: { message: String }) {
  return (
    <div className="w-full h-[50px] flex flex-row justify-end">
      <div className="max-w-[80%] bg-[#00205C] rounded-tl-[25px] rounded-b-[25px] inline-flex items-center justify-center gap-2 py-3 px-[14px]">
        <div className="text-white text-sm font-bold break-words">
          {message}
        </div>
      </div>
    </div>
  );
}
