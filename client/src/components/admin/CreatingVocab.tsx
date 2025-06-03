import {
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Tooltip,
  Chip,
  FormHelperText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { useRef, useState } from "react";
import CreateVocabDTO from "@/entities/DTOS/CreateVocabDTO";
import { toast } from "react-toastify";
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
  const inpRef = useRef<{ [key: string]: string }>({});

  const handleOnSave = () => {
    if (
      !inpRef.current.word ||
      !inpRef.current.meaning_en ||
      !inpRef.current.meaning_vi ||
      !inpRef.current.example ||
      !inpRef.current.spelling ||
      !inpRef.current.type
    ) {
      toast.error("Please fill all fields");
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

  return (
    <div className="relative">
      <div className="flex items-start gap-4 w-full">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
          {vocabNumber}
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextField
              disabled={isSaved}
              label="Vocabulary"
              name="word"
              onChange={({ target }) =>
                (inpRef.current[target.name] = target.value)
              }
              variant="outlined"
              fullWidth
              required
              className="transition-all duration-300 hover:shadow-md"
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel id={`vocab-type-label-${vocabId}`}>Type</InputLabel>
              <Select
                labelId={`vocab-type-label-${vocabId}`}
                id={`vocab-type-${vocabId}`}
                onChange={({ target }) =>
                  (inpRef.current["type"] = target.value as string)
                }
                disabled={isSaved}
                label="Type"
                defaultValue=""
                className="transition-all duration-300 hover:shadow-md w-[90%]"
              >
                <MenuItem value="noun">Noun</MenuItem>
                <MenuItem value="adjective">Adjective</MenuItem>
                <MenuItem value="adverb">Adverb</MenuItem>
                <MenuItem value="verb">Verb</MenuItem>
                <MenuItem value="preposition">Preposition</MenuItem>
                <MenuItem value="conjunction">Conjunction</MenuItem>
                <MenuItem value="interjection">Interjection</MenuItem>
                <MenuItem value="pronoun">Pronoun</MenuItem>
              </Select>
              <FormHelperText>Select the part of speech</FormHelperText>
            </FormControl>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm mb-2 text-gray-700">Image File</p>
              <div className="flex items-center gap-4">
                <input
                  id={`image-input-${vocabId}`}
                  type="file"
                  accept="image/*"
                  disabled={isSaved}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    document.getElementById(`image-input-${vocabId}`)?.click()
                  }
                  disabled={isSaved}
                  startIcon={<ImageIcon />}
                  size="small"
                  className="transition-all duration-300 hover:shadow-md"
                >
                  Select Image
                </Button>
                {imageFile ? (
                  <Chip
                    label={`${imageFile.name.slice(0, 10)}...${
                      imageFile.type.split("/")[1]
                    }`}
                    variant="outlined"
                    color="primary"
                    className="animate-fadeIn"
                    size="small"
                  />
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No image selected
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm mb-2 text-gray-700">Audio File</p>
              <div className="flex items-center gap-4">
                <input
                  id={`audio-input-${vocabId}`}
                  type="file"
                  accept="audio/*"
                  disabled={isSaved}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAudioFile(e.target.files[0]);
                    }
                  }}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    document.getElementById(`audio-input-${vocabId}`)?.click()
                  }
                  disabled={isSaved}
                  startIcon={<AudiotrackIcon />}
                  size="small"
                  className="transition-all duration-300 hover:shadow-md"
                >
                  Select Audio
                </Button>
                {audioFile ? (
                  <Chip
                    label={`${audioFile.name.slice(0, 10)}...${
                      audioFile.type.split("/")[1]
                    }`}
                    variant="outlined"
                    color="primary"
                    className="animate-fadeIn"
                    size="small"
                  />
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No audio selected
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextField
              disabled={isSaved}
              label="English Meaning"
              name="meaning_en"
              onChange={({ target }) =>
                (inpRef.current[target.name] = target.value)
              }
              variant="outlined"
              fullWidth
              required
              className="transition-all duration-300 hover:shadow-md"
            />

            <TextField
              disabled={isSaved}
              label="Vietnamese Meaning"
              name="meaning_vi"
              onChange={({ target }) =>
                (inpRef.current[target.name] = target.value)
              }
              variant="outlined"
              fullWidth
              required
              className="transition-all duration-300 hover:shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextField
              disabled={isSaved}
              label="Spelling"
              name="spelling"
              onChange={({ target }) =>
                (inpRef.current[target.name] = target.value)
              }
              variant="outlined"
              fullWidth
              required
              className="transition-all duration-300 hover:shadow-md"
            />

            <TextField
              disabled={isSaved}
              label="Example"
              name="example"
              onChange={({ target }) =>
                (inpRef.current[target.name] = target.value)
              }
              variant="outlined"
              fullWidth
              required
              className="transition-all duration-300 hover:shadow-md"
            />
          </div>

          <div className="flex justify-end mt-2">
            <Tooltip title={isSaved ? "Edit vocabulary" : "Save vocabulary"}>
              <Button
                variant="contained"
                color={isSaved ? "secondary" : "primary"}
                onClick={handleOnSave}
                startIcon={isSaved ? <EditIcon /> : <SaveIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                {isSaved ? "Edit" : "Save"}
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <Tooltip title="Delete vocabulary">
        <IconButton
          onClick={onDelete}
          size="small"
          color="error"
          className="absolute top-0 right-0"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
          disabled={vocabNumber === 1}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
