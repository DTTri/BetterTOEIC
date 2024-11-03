import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
export default function CreatingVocab({
  vocabNumber,
  onDelete,
}: {
  vocabNumber: number;
  onDelete: () => void;
}) {
  return (
    <div className="w-full flex gap-2 items-start">
      <div className="w-12 h-10 flex items-center justify-center rounded-full border border-gray-600">
        {vocabNumber}
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Vocabulary"
          className="bg-gray-200 w-1/2 p-2 border-none rounded-lg text-base text-black"
        />
        <input type="file" accept="image/*" className="w-1/5 " />
        <input type="file" accept="audio/*" className="w-1/5" />
        <input
          type="text"
          placeholder="English meaning"
          className="bg-gray-200 flex-1 p-2 border-none rounded-lg text-base text-black"
        />
        <input
          type="text"
          placeholder="Vietnamese meaning"
          className="bg-gray-200 flex-1 p-2 border-none rounded-lg text-base text-black"
        />
        <input
          type="text"
          placeholder="Example"
          className="bg-gray-200 w-full p-2 border-none rounded-lg text-base text-black"
        />
      </div>
      <IconButton onClick={onDelete} size="small">
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
