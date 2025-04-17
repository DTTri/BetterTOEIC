import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TypeChat({
  handleAddMessage,
  onHeightChange,
}: {
  handleAddMessage: (typedContent: string, images?: File[]) => void;
  onHeightChange: (height: number) => void;
}) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  useEffect(() => {
    return () => {
      setSelectedImages([]);
    };
  }, []);

  useEffect(() => {
    const height = selectedImages.length > 0 ? 200 : 100; // Adjust the height based on the number of selected images
    onHeightChange(height);
  }, [selectedImages, onHeightChange]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleOnSend = () => {
    const message = document.querySelector("textarea") as HTMLTextAreaElement;
    if (message.value.trim() === "") {
      toast.error("Please enter a message before sending.");
      return;
    }
    if (selectedImages.length > 5) {
      toast.error("You can only upload a maximum of 5 images.");
      return;
    }
    if(selectedImages.length == 0) {
      handleAddMessage(message.value);
    }
    else{
      handleAddMessage(message.value, selectedImages);
    }
    message.value = "";
    setSelectedImages([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleOnSend();
    }
  };

  return (
    <div className="w-full rounded-3xl rounded-t-none border-t-[1px] border-t-slate-200 bg-[#fff] px-6 py-4 flex flex-col gap-2">
      {selectedImages.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Selected ${index}`}
                className="w-20 h-20 object-cover rounded-md"
              />
              <DeleteIcon
                fontSize="medium"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 cursor-pointer text-red-500"
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-row items-top gap-1">
        <textarea
          placeholder="Write your message"
          className="flex-1 border-0 text-sm text-[#A1A1A1] font-bold px-1 focus:outline-none resize-none"
          onKeyDown={handleKeyDown}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          id="image-upload"
          className="hidden"
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <ImageIcon
            color="primary"
            className="cursor-pointer hover:bg-slate-200 rounded-full"
          />
        </label>
        <SendIcon
          onClick={handleOnSend}
          color="primary"
          className="cursor-pointer hover:bg-slate-200 rounded-full"
        />
      </div>
    </div>
  );
}