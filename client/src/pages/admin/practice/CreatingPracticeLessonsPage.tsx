import { Button } from "@mui/material";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import practiceService from "@/services/practiceService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <div className="creating-test-container">
      <h2 className="text-3xl font-bold">NEW LESSON</h2>
      <hr />
      <div className="items-start flex gap-8">
        <p className="text-2xl font-bold">Part:</p>
        <select
          className="bg-gray-50 border border-black rounded-sm shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
          value={part}
          onChange={(e) => {
            setPart(parseInt(e.target.value));
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div>
      <div className="w-1/2 items-center flex justify-start gap-8">
        <p className="text-2xl font-semibold">Title:</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Typing the title"
          className="border-2 border-black rounded-sm shadow-md p-2 flex-1
          focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
          "
        />
      </div>
      <div className="w-full flex flex-col items-start gap-4">
        <p className="text-2xl font-semibold">Content:</p>
        <Editor
          apiKey={API_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
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
      <div className="w-full flex justify-end gap-2 items-center">
        <Button
          onClick={handleCreate}
          variant="contained"
          style={{ backgroundColor: "#00205C" }}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
