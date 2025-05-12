import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import theme from "@/theme";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useRef, useState } from "react";
import { SWQuestion } from "@/entities";
import CreateSWTestDTO from "@/entities/DTOS/CreateSWTestDTO";
import { swTestService } from "@/services";
import http from "@/services/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sUser } from "@/store";
export default function CreatingSWTestPage() {
  const API_KEY = import.meta.env.VITE_TINY_MCE_API_KEY;
  const q6EditorRef = useRef<TinyMCEEditor | null>(null);
  const q7EditorRef = useRef<TinyMCEEditor | null>(null);
  const navigate = useNavigate();
  const user = sUser.use();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAllBlocked, setIsAllBlocked] = useState(false);

  interface ExtendedSWQuestion extends SWQuestion {
    imageFiles?: File[];
    image?: string[];
    images?: string[];
  }

  const [questions, setQuestions] = useState<ExtendedSWQuestion[]>(
    Array.from({ length: 19 }, (_, i) => ({
      question_number: i + 1,
      text: "",
    }))
  );

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      text: value,
    };
    setQuestions(updatedQuestions);
  };

  const handleImageUpload = (index: number, file: File) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[index].imageFiles) {
      updatedQuestions[index].imageFiles = [];
    }
    updatedQuestions[index].imageFiles = [file];
    setQuestions(updatedQuestions);

    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        image: [e.target?.result as string],
      };
      setQuestions(updatedQuestions);
    };
    reader.readAsDataURL(file);
  };

  const uploadFile = async (file: File) => {
    try {
      const response = await http.get(
        `file/presigned-url?fileName=${file.name}&contentType=${file.type}`
      );
      console.log(response);
      const result = await fetch(response.presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      console.log(result);
      if (!result.ok) {
        toast.error("Failed to upload file");
        return "";
      }
      return "https://seuit-qlnt.s3.amazonaws.com/" + response.key;
    } catch (error) {
      toast.error("Failed to upload file: " + error);
      return "";
    }
  };

  const handleCreateTest = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    try {
      setIsSubmitting(true);

      const uploadedQuestionPromises = questions.map(async (question) => {
        let imageUrls: string[] = [];
        if (question.imageFiles && question.imageFiles.length > 0) {
          imageUrls = await Promise.all(
            question.imageFiles.map(async (image) => await uploadFile(image))
          );

          if (imageUrls.some((url) => url === "")) {
            return null;
          }

          question.images = imageUrls;
          delete question.imageFiles;
          delete question.image;
        }
        return question;
      });

      const uploadedQuestions = await Promise.all(uploadedQuestionPromises);

      if (uploadedQuestions.some((q) => q === null)) {
        toast.error("Failed to upload some images");
        setIsSubmitting(false);
        return;
      }

      if (q6EditorRef.current && uploadedQuestions[16]) {
        uploadedQuestions[16].text = q6EditorRef.current.getContent();
      }
      if (q7EditorRef.current && uploadedQuestions[17]) {
        uploadedQuestions[17].text = q7EditorRef.current.getContent();
      }

      const testData: CreateSWTestDTO = {
        title,
        description,
        difficulty,
        created_by: user.info?._id || "admin",
        questions: uploadedQuestions.filter((q) => q !== null) as SWQuestion[],
      };

      const response = await swTestService.createSWTest(testData);
      if (response.EC === 0) {
        toast.success("Test created successfully");
        navigate("/admin/test");
      } else {
        toast.error(`Failed to create test: ${response.EM}`);
      }
    } catch (error) {
      console.error("Error creating test:", error);
      toast.error("An error occurred while creating the test");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeBlockStatus = () => {
    setIsAllBlocked(!isAllBlocked);
  };

  return (
    <div className="creating-test-container">
      <h2 className="text-2xl font-bold">S&W Toeic Test</h2>
      <hr />
      <div className="w-1/2 items-start flex justify-start gap-4">
        <h3 className="text-xl font-semibold basis-1/3">Title:</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isAllBlocked}
          placeholder="Typing the title"
          className="border-2 border-black rounded-sm shadow-md p-2 flex-1
      focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
      "
        />
      </div>
      <div className="w-1/2 items-start flex justify-start gap-4">
        <h3 className="text-xl font-semibold basis-1/3">Description:</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isAllBlocked}
          placeholder="Typing the description"
          className="border-2 border-black rounded-sm shadow-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>
      <div className="w-full flex flex-col gap-6">
        <h3 className="text-xl font-semibold">Speaking:</h3>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <h4 className="text-lg font-medium">Question 1:</h4>
              <textarea
                value={questions[0].text}
                onChange={(e) => handleQuestionChange(0, e.target.value)}
                disabled={isAllBlocked}
                placeholder="Typing the question"
                rows={6}
                className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <h4 className="text-lg font-medium">Question 2:</h4>
              <textarea
                value={questions[1].text}
                onChange={(e) => handleQuestionChange(1, e.target.value)}
                disabled={isAllBlocked}
                placeholder="Typing the question"
                rows={6}
                className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex gap-8">
              <h4 className="text-lg font-medium">Question 3:</h4>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      handleImageUpload(2, file);
                    }
                  };
                  input.click();
                }}
                disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                style={{
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                Add image file
              </Button>
            </div>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex gap-8">
              <h4 className="text-lg font-medium">Question 4:</h4>
              <Button
                variant="contained"
                color="primary"
                // onClick={handleFileInputClick}
                // disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                style={{
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                Add image file
              </Button>
            </div>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-1">
              <h4 className="text-lg font-medium">Question 5-7:</h4>
              <div className="flex flex-col gap-2 p-2">
                <p className="text-lg font-medium">Context</p>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    width: "fit-content",
                  }}
                >
                  Add audio file
                </Button>
                <textarea
                  value={questions[4].passage || ""}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[4] = {
                      ...updatedQuestions[4],
                      passage: e.target.value,
                    };
                    setQuestions(updatedQuestions);
                  }}
                  disabled={isAllBlocked}
                  placeholder="Typing the question"
                  rows={4}
                  className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <div className="flex gap-4 items-center">
                  <p className="text-lg font-medium min-w-fit">Question 5:</p>
                  <input
                    type="text"
                    value={questions[4].text || ""}
                    onChange={(e) => handleQuestionChange(4, e.target.value)}
                    disabled={isAllBlocked}
                    placeholder="Typing the question 5"
                    className="w-full border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <p className="text-lg font-medium min-w-fit">Question 6:</p>
                  <input
                    type="text"
                    value={questions[5].text || ""}
                    onChange={(e) => handleQuestionChange(5, e.target.value)}
                    disabled={isAllBlocked}
                    placeholder="Typing the question 6"
                    className="w-full border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <p className="text-lg font-medium min-w-fit">Question 7:</p>
                  <input
                    type="text"
                    value={questions[6].text || ""}
                    onChange={(e) => handleQuestionChange(6, e.target.value)}
                    disabled={isAllBlocked}
                    placeholder="Typing the question 7"
                    className="w-full border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-1">
              <h4 className="text-lg font-medium">Question 8-10:</h4>
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    width: "fit-content",
                  }}
                >
                  Add Image file
                </Button>
                <textarea
                  value={questions[7].passage || ""}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[7] = {
                      ...updatedQuestions[7],
                      passage: e.target.value,
                    };
                    setQuestions(updatedQuestions);
                  }}
                  disabled={isAllBlocked}
                  placeholder="Typing the question"
                  rows={4}
                  className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    width: "fit-content",
                  }}
                >
                  Add Audio file
                </Button>
              </div>
            </div>
          </div>{" "}
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-1">
              <h4 className="text-lg font-medium">Question 11:</h4>
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    width: "fit-content",
                  }}
                >
                  Add Audio file
                </Button>
                <textarea
                  value={questions[10].text || ""}
                  onChange={(e) => handleQuestionChange(10, e.target.value)}
                  disabled={isAllBlocked}
                  placeholder="Typing the question"
                  rows={4}
                  className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-6">
        <h3 className="text-xl font-semibold">Writing:</h3>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex gap-8">
                <h4 className="text-lg font-medium">Question 1:</h4>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  Add image file
                </Button>
              </div>
              <input
                type="text"
                value={questions[11].text || ""}
                onChange={(e) => handleQuestionChange(11, e.target.value)}
                disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                value={questions[11].passage || ""}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[11] = {
                    ...updatedQuestions[11],
                    passage: e.target.value,
                  };
                  setQuestions(updatedQuestions);
                }}
                disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex gap-8">
                <h4 className="text-lg font-medium">Question 2:</h4>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  Add image file
                </Button>
              </div>
              <input
                type="text"
                value={questions[12].text || ""}
                onChange={(e) => handleQuestionChange(12, e.target.value)}
                disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                value={questions[12].passage || ""}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[12] = {
                    ...updatedQuestions[12],
                    passage: e.target.value,
                  };
                  setQuestions(updatedQuestions);
                }}
                disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex gap-8">
                <h4 className="text-lg font-medium">Question 3:</h4>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  Add image file
                </Button>
              </div>
              <input
                type="text"
                value={questions[13].text || ""}
                onChange={(e) => handleQuestionChange(13, e.target.value)}
                disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                value={questions[13].passage || ""}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[13] = {
                    ...updatedQuestions[13],
                    passage: e.target.value,
                  };
                  setQuestions(updatedQuestions);
                }}
                disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex gap-8">
                <h4 className="text-lg font-medium">Question 4:</h4>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  Add image file
                </Button>
              </div>
              <input
                type="text"
                value={questions[14].text || ""}
                onChange={(e) => handleQuestionChange(14, e.target.value)}
                disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                value={questions[14].passage || ""}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[14] = {
                    ...updatedQuestions[14],
                    passage: e.target.value,
                  };
                  setQuestions(updatedQuestions);
                }}
                disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex gap-8">
                <h4 className="text-lg font-medium">Question 5:</h4>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  Add image file
                </Button>
              </div>
              <input
                type="text"
                value={questions[15].text || ""}
                onChange={(e) => handleQuestionChange(15, e.target.value)}
                disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                value={questions[15].passage || ""}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[15] = {
                    ...updatedQuestions[15],
                    passage: e.target.value,
                  };
                  setQuestions(updatedQuestions);
                }}
                disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <h4 className="text-lg font-medium">Question 6:</h4>
              <Editor
                apiKey={API_KEY}
                onInit={(_evt, editor) => (q6EditorRef.current = editor)}
                initialValue={questions[16].text || ""}
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
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <h4 className="text-lg font-medium">Question 7:</h4>
              <Editor
                apiKey={API_KEY}
                onInit={(_evt, editor) => (q7EditorRef.current = editor)}
                initialValue={questions[17].text || ""}
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
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <h4 className="text-lg font-medium">Question 8:</h4>
              <input
                type="text"
                value={questions[18].text || ""}
                onChange={(e) => handleQuestionChange(18, e.target.value)}
                disabled={isAllBlocked}
                placeholder="Typing the topic"
                className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center gap-4 mt-4">
        <Button
          variant="contained"
          color="secondary"
          style={{
            width: "fit-content",
            height: "fit-content",
            textTransform: "none",
          }}
          onClick={handleChangeBlockStatus}
        >
          {isAllBlocked ? "Unsave" : "Save all"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "fit-content",
            height: "fit-content",
            textTransform: "none",
          }}
          onClick={handleCreateTest}
          disabled={isSubmitting || !isAllBlocked}
        >
          {isSubmitting ? "Creating..." : "Create Test"}
        </Button>
      </div>
    </div>
  );
}
