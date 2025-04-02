// This is just a stub code (mock code)
import { useState } from "react";
export default function PartItemsContainer() {
  const numberOfParts = 7;
  const [selectedPart, setSelectedPart] = useState(1);
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: numberOfParts }).map((_, index) => (
        <div
          key={index}
          onClick={() => setSelectedPart(index + 1)}
          className={`px-3 py-1 bg-gray-300 rounded-md flex justify-center items-center text-black hover:cursor-pointer ${
            selectedPart === index + 1 ? "bg-primary text-white" : ""
          }`}
        >
          Part {index + 1}
        </div>
      ))}
    </div>
  );
}
