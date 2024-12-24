export default function Steps({ currentStep }: { currentStep: number }) {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="progress-bar flex items-center gap-0">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-xl border border-black  ${
            currentStep > 0 ? "bg-primary text-white" : "bg-[#D0E3FF]"
          }`}
        >
          1
        </div>
        <div
          className={`w-10 h-2 ${
            currentStep > 1 ? "bg-primary text-white" : "bg-[#D0E3FF]"
          }`}
        ></div>
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-xl border border-black ${
            currentStep > 1 ? "bg-primary text-white" : "bg-[#D0E3FF]"
          }`}
        >
          2
        </div>
        <div
          className={`w-10 h-2 ${
            currentStep > 2 ? "bg-primary text-white" : "bg-[#D0E3FF]"
          }`}
        ></div>
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-xl border border-black ${
            currentStep > 2 ? "bg-primary text-white" : "bg-[#D0E3FF]"
          }`}
        >
          3
        </div>
      </div>
    </div>
  );
}
