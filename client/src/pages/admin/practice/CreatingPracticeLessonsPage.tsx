import {
  Button,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import practiceService from "@/services/practiceService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";

export default function CreatingPracticeLessonsPage() {
  const API_KEY = import.meta.env.VITE_TINY_MCE_API_KEY;
  const [part, setPart] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const nav = useNavigate();
  const handleCreate = async () => {
    if (title === "" || !editorRef.current) {
      toast.error("Please fill in all fields");
    } else {
      try {
        const res = await practiceService.createPracticeLesson({
          part,
          title,
          content: editorRef.current.getContent(),
          created_by: "admin",
        });
        if (res.EC === 0) {
          toast.success("Create lesson successfully");
          nav("/admin/practice");
        }
      } catch (err) {
        toast.error("Create lesson failed: " + err);
      }
    }
  };
  return (
    <div className="creating-test-container max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Create New Practice Lesson
      </h1>

      <Paper elevation={2} className="p-6 mb-8 rounded-xl shadow-lg bg-gray-50">
        <h2 className="text-xl text-gray-700 font-medium mb-4">
          Lesson Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-gray-700">Part:</h3>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="part-label">Select Part</InputLabel>
              <Select
                labelId="part-label"
                id="part-select"
                value={part}
                onChange={(e) => setPart(Number(e.target.value))}
                label="Select Part"
                className="transition-all duration-300 hover:shadow-md"
              >
                <MenuItem value={1}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    Part 1: Photographs
                  </div>
                </MenuItem>
                <MenuItem value={2}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    Part 2: Question-Response
                  </div>
                </MenuItem>
                <MenuItem value={3}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                    Part 3: Conversations
                  </div>
                </MenuItem>
                <MenuItem value={4}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                    Part 4: Talks
                  </div>
                </MenuItem>
                <MenuItem value={5}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    Part 5: Incomplete Sentences
                  </div>
                </MenuItem>
                <MenuItem value={6}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                    Part 6: Text Completion
                  </div>
                </MenuItem>
                <MenuItem value={7}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-pink-500 mr-2"></div>
                    Part 7: Reading Comprehension
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-gray-700">Title:</h3>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter lesson title"
              variant="outlined"
              fullWidth
              required
              label="Lesson Title"
              className="transition-all duration-300 hover:shadow-md"
            />
          </div>
        </div>
      </Paper>

      <div className="mb-4">
        <Editor
          apiKey={API_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Tooltip title="Create new lesson">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            startIcon={<CreateIcon />}
            className="transition-all duration-300 hover:shadow-lg px-6 py-2"
            size="large"
          >
            Create Lesson
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
