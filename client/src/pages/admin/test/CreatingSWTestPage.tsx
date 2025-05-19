import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Divider,
  Tooltip,
  Chip,
  Box,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SaveIcon from "@mui/icons-material/Save";
import CreateIcon from "@mui/icons-material/Create";
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
    audioFile?: File;
    image?: string[];
    images?: string[];
    question_audio?: string;
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

  const handleAudioUpload = (index: number, file: File) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      audioFile: file,
    };

    const audioUrl = URL.createObjectURL(file);

    updatedQuestions[index].question_audio = audioUrl;
    setQuestions(updatedQuestions);

    console.log(`Audio file uploaded for question ${index + 1}: ${file.name}`);
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
        let audioUrl: string = "";

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

        if (question.audioFile) {
          audioUrl = await uploadFile(question.audioFile);

          if (audioUrl === "") {
            return null;
          }

          question.question_audio = audioUrl;
          delete question.audioFile;
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
    <div className="creating-test-container max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Create New TOEIC S&W Test
      </h1>
      <Paper elevation={2} className="p-6 mb-8 rounded-xl shadow-lg bg-gray-50">
        <h2 className="text-xl text-gray-700 font-medium mb-4">
          Test Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormControl fullWidth variant="outlined">
            <TextField
              id="test-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isAllBlocked}
              placeholder="Enter test title"
              variant="outlined"
              fullWidth
              required
              label="Title"
              className="transition-all duration-300 hover:shadow-md"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <TextField
              id="test-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isAllBlocked}
              placeholder="Enter test description"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={3}
              label="Description"
              className="transition-all duration-300 hover:shadow-md"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              disabled={isAllBlocked}
              label="Difficulty"
              className="transition-all duration-300 hover:shadow-md"
            >
              <MenuItem value="Beginner">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  Beginner
                </div>
              </MenuItem>
              <MenuItem value="Intermediate">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                  Intermediate
                </div>
              </MenuItem>
              <MenuItem value="Advanced">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  Advanced
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </Paper>
      <div className="grid grid-cols-1 gap-8 mb-8">
        <Paper
          elevation={3}
          className="p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-blue-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-700 font-bold">
              1
            </div>
            Speaking Question 1: Read Aloud
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Read the text aloud.
          </p>
          <TextField
            value={questions[0].text}
            onChange={(e) => handleQuestionChange(0, e.target.value)}
            disabled={isAllBlocked}
            placeholder="Enter the question text"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            className="transition-all duration-300 hover:shadow-md"
          />
        </Paper>
        <Paper
          elevation={3}
          className="p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-blue-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-700 font-bold">
              2
            </div>
            Speaking Question 2: Read Aloud
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Read the text aloud.
          </p>
          <TextField
            value={questions[1].text}
            onChange={(e) => handleQuestionChange(1, e.target.value)}
            disabled={isAllBlocked}
            placeholder="Enter the question text"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            className="transition-all duration-300 hover:shadow-md"
          />
        </Paper>

        <Paper
          elevation={3}
          className="p-6 border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-green-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 text-green-700 font-bold">
              3
            </div>
            Speaking Question 3: Describe a Picture
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Look at the picture and describe what you see.
          </p>
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <input
                id="q3-image-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(2, file);
                  }
                }}
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("q3-image-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Image
              </Button>
              {questions[2].image && questions[2].image.length > 0 ? (
                <Chip
                  label="Image uploaded"
                  color="success"
                  variant="outlined"
                  className="animate-fadeIn"
                />
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No image uploaded
                </span>
              )}
            </div>
            {questions[2].image && questions[2].image.length > 0 && (
              <Box className="mb-4 max-w-md mx-auto">
                <img
                  src={questions[2].image[0]}
                  alt="Question 3"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </Box>
            )}
          </div>
        </Paper>
        <Paper
          elevation={3}
          className="p-6 border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-green-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 text-green-700 font-bold">
              4
            </div>
            Speaking Question 4: Describe a Picture
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Look at the picture and describe what you see.
          </p>
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <input
                id="q4-image-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(3, file);
                  }
                }}
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("q4-image-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Image
              </Button>
              {questions[3].image && questions[3].image.length > 0 ? (
                <Chip
                  label="Image uploaded"
                  color="success"
                  variant="outlined"
                  className="animate-fadeIn"
                />
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No image uploaded
                </span>
              )}
            </div>
            {questions[3].image && questions[3].image.length > 0 && (
              <Box className="mb-4 max-w-md mx-auto">
                <img
                  src={questions[3].image[0]}
                  alt="Question 4"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </Box>
            )}
          </div>
        </Paper>
        <Paper
          elevation={3}
          className="p-6 border-l-4 border-amber-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-amber-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2 text-amber-700 font-bold">
              5
            </div>
            Speaking Questions 5-7: Respond to Questions
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Listen to the information and answer the questions.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="mb-2 font-medium text-base">Context Information</h4>
            <div className="flex items-center gap-4 mb-4">
              <input
                id="q5-7-audio-input"
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleAudioUpload(4, file);
                  }
                }}
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("q5-7-audio-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AudiotrackIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Audio
              </Button>
              {questions[4].question_audio ? (
                <div className="flex items-center gap-2">
                  <Chip
                    label="Audio uploaded"
                    color="success"
                    variant="outlined"
                    className="animate-fadeIn"
                  />
                  <audio
                    controls
                    src={questions[4].question_audio}
                    className="h-8 w-48"
                  />
                </div>
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No audio uploaded
                </span>
              )}
            </div>

            <TextField
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
              placeholder="Enter context information"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className="mb-4 transition-all duration-300 hover:shadow-md"
            />

            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <h5 className="mb-2 text-sm font-medium">Question 5:</h5>
                <TextField
                  value={questions[4].text || ""}
                  onChange={(e) => handleQuestionChange(4, e.target.value)}
                  disabled={isAllBlocked}
                  placeholder="Enter question 5"
                  variant="outlined"
                  fullWidth
                  className="transition-all duration-300 hover:shadow-md"
                />
              </div>

              <div className="flex flex-col">
                <h5 className="mb-2 text-sm font-medium">Question 6:</h5>
                <TextField
                  value={questions[5].text || ""}
                  onChange={(e) => handleQuestionChange(5, e.target.value)}
                  disabled={isAllBlocked}
                  placeholder="Enter question 6"
                  variant="outlined"
                  fullWidth
                  className="transition-all duration-300 hover:shadow-md"
                />
              </div>

              <div className="flex flex-col">
                <h5 className="mb-2 text-sm font-medium">Question 7:</h5>
                <TextField
                  value={questions[6].text || ""}
                  onChange={(e) => handleQuestionChange(6, e.target.value)}
                  disabled={isAllBlocked}
                  placeholder="Enter question 7"
                  variant="outlined"
                  fullWidth
                  className="transition-all duration-300 hover:shadow-md"
                />
              </div>
            </div>
          </div>
        </Paper>
        <Paper
          elevation={3}
          className="p-6 border-l-4 border-purple-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-purple-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2 text-purple-700 font-bold">
              8
            </div>
            Speaking Questions 8-10: Respond to Information
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Look at the information and answer the questions.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-4 mb-4">
              <input
                id="q8-10-image-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("q8-10-image-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Image
              </Button>
              <span className="text-gray-500 italic text-sm">
                No image uploaded
              </span>
            </div>

            <TextField
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
              placeholder="Enter context information"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className="mb-4 transition-all duration-300 hover:shadow-md"
            />

            <div className="flex items-center gap-4 mb-4">
              <input
                id="q8-10-audio-input"
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleAudioUpload(7, file);
                  }
                }}
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("q8-10-audio-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AudiotrackIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Audio
              </Button>
              {questions[7].question_audio ? (
                <div className="flex items-center gap-2">
                  <Chip
                    label="Audio uploaded"
                    color="success"
                    variant="outlined"
                    className="animate-fadeIn"
                  />
                  <audio
                    controls
                    src={questions[7].question_audio}
                    className="h-8 w-48"
                  />
                </div>
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No audio uploaded
                </span>
              )}
            </div>
          </div>
        </Paper>
        <Paper
          elevation={3}
          className="p-6 border-l-4 border-red-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-red-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2 text-red-700 font-bold">
              11
            </div>
            Speaking Question 11: Express an Opinion
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Express your opinion on the given topic.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-4 mb-4">
              <input
                id="q11-audio-input"
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleAudioUpload(10, file);
                  }
                }}
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("q11-audio-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AudiotrackIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Audio
              </Button>
              {questions[10].question_audio ? (
                <div className="flex items-center gap-2">
                  <Chip
                    label="Audio uploaded"
                    color="success"
                    variant="outlined"
                    className="animate-fadeIn"
                  />
                  <audio
                    controls
                    src={questions[10].question_audio}
                    className="h-8 w-48"
                  />
                </div>
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No audio uploaded
                </span>
              )}
            </div>

            <TextField
              value={questions[10].text || ""}
              onChange={(e) => handleQuestionChange(10, e.target.value)}
              disabled={isAllBlocked}
              placeholder="Enter the opinion topic"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className="transition-all duration-300 hover:shadow-md"
            />
          </div>
        </Paper>
      </div>
      <Divider />
      <div className="grid grid-cols-1 gap-8 my-8">
        <Paper
          elevation={3}
          className="p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-blue-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-700 font-bold">
              1
            </div>
            Writing Question 1: Describe a Picture
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Write a description of the picture using the given keywords.
          </p>

          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <input
                id="writing-q1-image-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(11, file);
                  }
                }}
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("writing-q1-image-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Image
              </Button>
              {questions[11].image && questions[11].image.length > 0 ? (
                <Chip
                  label="Image uploaded"
                  color="success"
                  variant="outlined"
                  className="animate-fadeIn"
                />
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No image uploaded
                </span>
              )}
            </div>

            {questions[11].image && questions[11].image.length > 0 && (
              <Box className="mb-4 max-w-md mx-auto">
                <img
                  src={questions[11].image[0]}
                  alt="Writing Question 1"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </Box>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <TextField
                value={questions[11].text || ""}
                onChange={(e) => handleQuestionChange(11, e.target.value)}
                disabled={isAllBlocked}
                label="Keyword 1"
                placeholder="Enter keyword 1"
                variant="outlined"
                fullWidth
                className="transition-all duration-300 hover:shadow-md"
              />

              <TextField
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
                label="Keyword 2"
                placeholder="Enter keyword 2"
                variant="outlined"
                fullWidth
                className="transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>
        </Paper>
        <Paper
          elevation={3}
          className="p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-blue-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-700 font-bold">
              2
            </div>
            Writing Question 2: Describe a Picture
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Write a description of the picture using the given keywords.
          </p>

          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <input
                id="writing-q2-image-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(12, file);
                  }
                }}
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("writing-q2-image-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Image
              </Button>
              {questions[12].image && questions[12].image.length > 0 ? (
                <Chip
                  label="Image uploaded"
                  color="success"
                  variant="outlined"
                  className="animate-fadeIn"
                />
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No image uploaded
                </span>
              )}
            </div>

            {questions[12].image && questions[12].image.length > 0 && (
              <Box className="mb-4 max-w-md mx-auto">
                <img
                  src={questions[12].image[0]}
                  alt="Writing Question 2"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </Box>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <TextField
                value={questions[12].text || ""}
                onChange={(e) => handleQuestionChange(12, e.target.value)}
                disabled={isAllBlocked}
                label="Keyword 1"
                placeholder="Enter keyword 1"
                variant="outlined"
                fullWidth
                className="transition-all duration-300 hover:shadow-md"
              />

              <TextField
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
                label="Keyword 2"
                placeholder="Enter keyword 2"
                variant="outlined"
                fullWidth
                className="transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>
        </Paper>
        <Paper
          elevation={3}
          className="p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-blue-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-700 font-bold">
              3
            </div>
            Writing Question 3: Describe a Picture
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Write a description of the picture using the given keywords.
          </p>

          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <input
                id="writing-q3-image-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(13, file);
                  }
                }}
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("writing-q3-image-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Image
              </Button>
              {questions[13].image && questions[13].image.length > 0 ? (
                <Chip
                  label="Image uploaded"
                  color="success"
                  variant="outlined"
                  className="animate-fadeIn"
                />
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No image uploaded
                </span>
              )}
            </div>

            {questions[13].image && questions[13].image.length > 0 && (
              <Box className="mb-4 max-w-md mx-auto">
                <img
                  src={questions[13].image[0]}
                  alt="Writing Question 3"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </Box>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <TextField
                value={questions[13].text || ""}
                onChange={(e) => handleQuestionChange(13, e.target.value)}
                disabled={isAllBlocked}
                label="Keyword 1"
                placeholder="Enter keyword 1"
                variant="outlined"
                fullWidth
                className="transition-all duration-300 hover:shadow-md"
              />

              <TextField
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
                label="Keyword 2"
                placeholder="Enter keyword 2"
                variant="outlined"
                fullWidth
                className="transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>
        </Paper>

        <Paper
          elevation={3}
          className="p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-blue-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-700 font-bold">
              4
            </div>
            Writing Question 4: Describe a Picture
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Write a description of the picture using the given keywords.
          </p>

          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <input
                id="writing-q4-image-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(14, file);
                  }
                }}
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("writing-q4-image-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Image
              </Button>
              {questions[14].image && questions[14].image.length > 0 ? (
                <Chip
                  label="Image uploaded"
                  color="success"
                  variant="outlined"
                  className="animate-fadeIn"
                />
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No image uploaded
                </span>
              )}
            </div>

            {questions[14].image && questions[14].image.length > 0 && (
              <Box className="mb-4 max-w-md mx-auto">
                <img
                  src={questions[14].image[0]}
                  alt="Writing Question 4"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </Box>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <TextField
                value={questions[14].text || ""}
                onChange={(e) => handleQuestionChange(14, e.target.value)}
                disabled={isAllBlocked}
                label="Keyword 1"
                placeholder="Enter keyword 1"
                variant="outlined"
                fullWidth
                className="transition-all duration-300 hover:shadow-md"
              />

              <TextField
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
                label="Keyword 2"
                placeholder="Enter keyword 2"
                variant="outlined"
                fullWidth
                className="transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>
        </Paper>

        <Paper
          elevation={3}
          className="p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-blue-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-700 font-bold">
              5
            </div>
            Writing Question 5: Describe a Picture
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Write a description of the picture using the given keywords.
          </p>

          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <input
                id="writing-q5-image-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(15, file);
                  }
                }}
                style={{ display: "none" }}
                disabled={isAllBlocked}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  document.getElementById("writing-q5-image-input")?.click()
                }
                disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Upload Image
              </Button>
              {questions[15].image && questions[15].image.length > 0 ? (
                <Chip
                  label="Image uploaded"
                  color="success"
                  variant="outlined"
                  className="animate-fadeIn"
                />
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No image uploaded
                </span>
              )}
            </div>

            {questions[15].image && questions[15].image.length > 0 && (
              <Box className="mb-4 max-w-md mx-auto">
                <img
                  src={questions[15].image[0]}
                  alt="Writing Question 5"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </Box>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <TextField
                value={questions[15].text || ""}
                onChange={(e) => handleQuestionChange(15, e.target.value)}
                disabled={isAllBlocked}
                label="Keyword 1"
                placeholder="Enter keyword 1"
                variant="outlined"
                fullWidth
                className="transition-all duration-300 hover:shadow-md"
              />

              <TextField
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
                label="Keyword 2"
                placeholder="Enter keyword 2"
                variant="outlined"
                fullWidth
                className="transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>
        </Paper>
        <Paper
          elevation={3}
          className="p-6 border-l-4 border-purple-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-purple-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2 text-purple-700 font-bold">
              6
            </div>
            Writing Question 6: Write a Paragraph
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Write a paragraph based on the given information.
          </p>

          <div className="mb-4">
            <Editor
              apiKey={API_KEY}
              onInit={(_evt, editor) => (q6EditorRef.current = editor)}
              initialValue={questions[16].text || ""}
              init={{
                height: 400,
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
              disabled={isAllBlocked}
            />
          </div>
        </Paper>

        <Paper
          elevation={3}
          className="p-6 border-l-4 border-purple-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-purple-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2 text-purple-700 font-bold">
              7
            </div>
            Writing Question 7: Write a Paragraph
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Write a paragraph based on the given information.
          </p>

          <div className="mb-4">
            <Editor
              apiKey={API_KEY}
              onInit={(_evt, editor) => (q7EditorRef.current = editor)}
              initialValue={questions[17].text || ""}
              init={{
                height: 400,
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
              disabled={isAllBlocked}
            />
          </div>
        </Paper>

        <Paper
          elevation={3}
          className="p-6 border-l-4 border-red-500 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="mb-4 flex items-center text-red-700 text-lg font-medium">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2 text-red-700 font-bold">
              8
            </div>
            Writing Question 8: Write an Essay
          </h3>
          <p className="mb-4 text-gray-600 italic text-sm">
            Write an essay on the given topic.
          </p>

          <div className="mb-4">
            <TextField
              value={questions[18].text || ""}
              onChange={(e) => handleQuestionChange(18, e.target.value)}
              disabled={isAllBlocked}
              label="Essay Topic"
              placeholder="Enter the essay topic"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              className="transition-all duration-300 hover:shadow-md"
            />
          </div>
        </Paper>
      </div>
      <div className="flex justify-center gap-4">
        <Tooltip title={isAllBlocked ? "Unsave changes" : "Save all changes"}>
          <Button
            variant="contained"
            color={isAllBlocked ? "error" : "secondary"}
            onClick={handleChangeBlockStatus}
            startIcon={<SaveIcon />}
            className="transition-all duration-300 hover:shadow-lg"
            size="large"
          >
            {isAllBlocked ? "Unsave" : "Save All"}
          </Button>
        </Tooltip>
        <Tooltip title="Create test">
          <span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTest}
              disabled={isSubmitting || !isAllBlocked}
              startIcon={<CreateIcon />}
              className="transition-all duration-300 hover:shadow-lg"
              size="large"
            >
              {isSubmitting ? "Creating..." : "Create Test"}
            </Button>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
