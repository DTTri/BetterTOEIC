import Message from "@/entities/Chat";
import { useState } from "react";
import ImageModal from "../forum/ImageModal";

export default function UserLogChat({ message }: { message: Message }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageClick = (image: string) => {
    if (selectedImage === image) {
      setSelectedImage(null); // Deselect the image if it's already selected
    } else {
      setSelectedImage(image); // Select the clicked image
    }
  };
  return (
    <div className="w-full flex flex-row justify-end mb-5">
      <div className="max-w-[80%] flex flex-col gap-1 items-end">
        <div className="flex flex-row gap-1">
          {message.images?.map((image, i) => (
            <img
              key={i}
              onClick={handleImageClick.bind(null, image)}
              alt={`image-${i}`}
              src={image}
              className="w-20 h-20 object-cover rounded-md cursor-pointer"
            />
          ))}
        </div>
        <div className="bg-[#00205C] rounded-tl-[25px] rounded-b-[25px] text-white text-sm font-bold inline-flex items-center justify-center gap-2 p-2 px-[14px] break-words whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
      {selectedImage !== null && (
        <ImageModal
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
