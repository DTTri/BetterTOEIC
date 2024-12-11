import { Button, IconButton, MenuItem, Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef, useState } from "react";
import CreateVocabDTO from "@/entities/DTOS/CreateVocabDTO";
import Dropzone, { IFileWithMeta, StatusValue } from "react-dropzone-uploader";
export default function CreatingVocab({
  vocabId,
  vocabNumber,
  onDelete,
  onSave,
}: {
  vocabNumber: number;
  vocabId: string;
  onDelete: () => void;
  onSave: (CreateVocabDTO: CreateVocabDTO, id: string) => void;
}) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const dropzoneImageRef = useRef<any>(null);
  const dropzoneAudioRef = useRef<any>(null);
  const inpRef = useRef<{ [key: string]: any }>({});

  const handleOnSave = () => {
    if(!inpRef.current.word || !inpRef.current.meaning_en || !inpRef.current.meaning_vi || !inpRef.current.example || !inpRef.current.spelling || !inpRef.current.type) {
      alert("Please fill all fields");
      return;
    }
    setIsSaved(!isSaved);
    onSave(
      {
        word: inpRef.current.word,
        meaning_en: inpRef.current.meaning_en,
        meaning_vi: inpRef.current.meaning_vi,
        image: imageFile as File,
        audio: audioFile as File,
        example: inpRef.current.example,
        spelling: inpRef.current.spelling,
        type: inpRef.current.type,
      },
      vocabId
    );
  };

  const handleChangeStatus = (
    file: IFileWithMeta,
    status: StatusValue,
    type: "image" | "audio"
  ) => {
    console.log(status, file.file.name);
    if (status === "done") {
      if (type === "image") {
        setImageFile(file.file);
      } else if (type === "audio") {
        setAudioFile(file.file);
      }
    }
  };
  return (
    <div className="w-full flex gap-2 items-start">
      <div className="w-12 h-10 flex items-center justify-center rounded-full border border-gray-600">
        {vocabNumber}
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          disabled={isSaved}
          type="text"
          placeholder="Vocabulary"
          name="word"
          onChange={({ target }) => inpRef.current[target.name] = target.value}
          className="bg-gray-200 w-1/2 p-2 border-none rounded-lg text-base text-black"
        />
        <Select onChange={
          ({ target }) => inpRef.current["type"] = target.value as string
        } disabled={isSaved} className="w-1/3" defaultValue="" >
          <MenuItem value="noun">Noun</MenuItem>
          <MenuItem value="adjective">Adjective</MenuItem>
          <MenuItem value="adverb">Adverb</MenuItem>
          <MenuItem value="verb">Verb</MenuItem>
          <MenuItem value="preposition">Preposition</MenuItem>
          <MenuItem value="conjunction">Conjunction</MenuItem>
          <MenuItem value="interjection">Interjection</MenuItem>
          <MenuItem value="pronoun">Pronoun</MenuItem>
        </Select>
        <div className="w-1/2 flex flex-row gap-2 items-center">
          <label className="font-bold ">Image: </label>
          <Dropzone
            disabled={isSaved}
            ref={dropzoneImageRef}
            onChangeStatus={(fileWithMeta, status) =>
              handleChangeStatus(fileWithMeta, status, "image")
            }
            maxFiles={1}
            multiple={true}
            inputContent="Drop files here or click to browse"
            accept="image/*"
            submitButtonDisabled={false}
            canRemove={true}
            classNames={{
              dropzone: `h-[80px] bg-gray-100 text-[20px] text-gray-500 flex items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-md`,
              submitButton: "hidden",
              previewImage: "w-[100px] h-[80px] rounded-md flex items-center justify-center",
              submitButtonContainer: "hidden",
              inputLabel: "text-blue-500 text-[14px] hover:text-blue-700 cursor-pointer mr-2",
            }}/>
        </div>
        <div className="w-[45%] flex flex-row gap-2 items-center">
          <label className="font-bold">Audio: </label>
          <Dropzone
            disabled={isSaved}
            ref={dropzoneAudioRef}
            onChangeStatus={(fileWithMeta, status) =>
              handleChangeStatus(fileWithMeta, status, "audio")
            }
            maxFiles={1}
            multiple={true}
            inputContent="Drop files here or click to browse"
            accept="audio/*"
            classNames={{
              dropzone: `h-[80px] bg-gray-100 text-[20px] text-gray-500 flex items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-md`,
              submitButton: "hidden",
              submitButtonContainer: "hidden",
              inputLabel: "text-blue-500 text-[14px] hover:text-blue-700 cursor-pointer mr-2",
            }}/>
        </div>
        <input
          type="text"
          disabled={isSaved}
          placeholder="English meaning"
          name="meaning_en"
          onChange={({ target }) => inpRef.current[target.name] = target.value}
          className="bg-gray-200 flex-1 p-2 border-none rounded-lg text-base text-black"
        />
        <input
          type="text"
          disabled={isSaved}
          placeholder="Vietnamese meaning"
          name="meaning_vi"
          onChange={({ target }) => inpRef.current[target.name] = target.value}
          className="bg-gray-200 flex-1 p-2 border-none rounded-lg text-base text-black"
        />
        <input
          type="text"
          disabled={isSaved}
          placeholder="Spelling"
          name="spelling"
          onChange={({ target }) => inpRef.current[target.name] = target.value}
          className="bg-gray-200 w-full p-2 border-none rounded-lg text-base text-black"
        />
        <input
          type="text"
          disabled={isSaved}
          placeholder="Example"
          name="example"
          onChange={({ target }) => inpRef.current[target.name] = target.value}
          className="bg-gray-200 w-full p-2 border-none rounded-lg text-base text-black"
        />
        <div className="flex flex-row justify-end">
          <Button
            variant="contained"
            className={`p-2 rounded-lg ${
              isSaved ? "bg-green-500 text-white" : "bg-gray-300 text-black"
            }`}
            style={{ backgroundColor: isSaved ? "#FF0000" : "#4caf50" }}
            onClick={handleOnSave}
          >
            {isSaved ? "Unsave" : "Save"}
          </Button>
        </div>
      </div>
      <IconButton onClick={onDelete} size="small">
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
