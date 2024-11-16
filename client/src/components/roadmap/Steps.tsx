export default function Steps({ currentStep }: { currentStep: number }) {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="progress-bar flex items-center gap-0">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-xl border border-black  ${
            currentStep > 0 ? "bg-purple-600" : "bg-blue-400"
          }`}
        >
          1
        </div>
        <div
          className={`w-10 h-2 ${
            currentStep > 1 ? "bg-purple-600" : "bg-blue-400"
          }`}
        ></div>
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-xl border border-black ${
            currentStep > 1 ? "bg-purple-600" : "bg-blue-400"
          }`}
        >
          2
        </div>
        <div
          className={`w-10 h-2 ${
            currentStep > 2 ? "bg-purple-600" : "bg-blue-400"
          }`}
        ></div>
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-xl border border-black ${
            currentStep > 2 ? "bg-purple-600" : "bg-blue-400"
          }`}
        >
          3
        </div>
      </div>
    </div>
  );
}
