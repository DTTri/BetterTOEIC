import LoadingProgress from "@/components/LoadingProgress";
import CreatePostDTO from "@/entities/DTOS/CreatePostDTO";
import { forumService } from "@/services";
import http from "@/services/http";
import { sUser } from "@/store";
import sForum from "@/store/forumStore";
import {
  Button,
  Paper,
  TextField,
  Tooltip,
  Chip,
  IconButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreateIcon from "@mui/icons-material/Create";
import RefreshIcon from "@mui/icons-material/Refresh";
import ImageIcon from "@mui/icons-material/Image";

export default function CreatingPostPage() {
  const [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const SUser = sUser.use((state) => state.info);
  const [user, setUser] = useState(SUser);
  const nav = useNavigate();
  const content = useRef<string>("");
  const [imgFile, setImgFile] = useState<File[] | null>(null);

  useEffect(() => {
    setUser(SUser);
  }, [SUser]);

  if (!user) {
    return <LoadingProgress />;
  }

  if (isCreating) {
    return <LoadingProgress />;
  }

  const uploadFile = async (file: File) => {
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
    if (!result.ok) {
      throw new Error("Failed to upload image");
    }
    console.log(result);

    return "https://seuit-qlnt.s3.amazonaws.com/" + response.key;
  };

  const handleSubmit = async (files: File[]) => {
    try {
      let images: string[] = [];
      const uploadPromises = files.map(async (file) => {
        return await uploadFile(file);
      });
      if (uploadPromises.length > 0) {
        images = await Promise.all(uploadPromises);
      }
      console.log("Images uploaded:", images);
      return images;
    } catch (error) {
      toast("Failed to upload images: " + error, { type: "error" });
      return null;
    }
  };

  const handleCreateButtonClick = async () => {
    setIsCreating(true);
    if (!content.current) {
      toast("Content cannot be empty", { type: "error" });
      return;
    }
    let images: string[] | null = null;
    if (imgFile && imgFile.length > 0) {
      images = await handleSubmit(imgFile || []);
    }
    const newPost: CreatePostDTO = {
      content: content.current,
      contentImage: images || [],
      creator: {
        _id: user._id,
        username: user.name,
        avatar: user.avatar,
      },
    };
    try {
      const response = await forumService.createPost(newPost);
      if (response.EC === 0) {
        toast("Post created successfully", { type: "success" });
        sForum.set((pre) => pre.value.posts.push(response.DT));
        nav(-1);
      } else {
        toast("Failed to create post: " + response.EM, { type: "error" });
      }
    } catch (error) {
      toast("Failed to create post: " + error, { type: "error" });
    }
    setIsCreating(false);
  };

  return (
    <div className="creating-test-container max-w-7xl mx-auto px-4 py-6 mt-4">
      <h4 className="text-3xl font-semibold">Create New Forum Post</h4>

      <Paper elevation={2} className="p-6 mb-8 rounded-xl shadow-lg bg-gray-50">
        <div className="mb-6">
          <TextField
            placeholder="Type your post content here..."
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            onChange={(e) => (content.current = e.target.value)}
            className="transition-all duration-300 hover:shadow-md"
          />
        </div>

        <div className="mb-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <input
                id="image-input"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setImgFile(Array.from(e.target.files));
                  }
                }}
                style={{ display: "none" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.getElementById("image-input")?.click()}
                startIcon={<ImageIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Select Images
              </Button>
              {imgFile && imgFile.length > 0 ? (
                <Chip
                  label={`${imgFile.length} image${
                    imgFile.length > 1 ? "s" : ""
                  } selected`}
                  variant="outlined"
                  color="primary"
                  className="animate-fadeIn"
                />
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No images selected
                </p>
              )}
            </div>

            {imgFile && imgFile.length > 0 && (
              <Paper elevation={1} className="p-4 rounded-xl bg-white">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imgFile.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-full h-32 object-cover rounded-md transition-all duration-300 hover:shadow-md"
                      />
                      <Tooltip title="Remove image">
                        <IconButton
                          size="small"
                          color="error"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white"
                          onClick={() => {
                            const newImgFiles = [...imgFile];
                            newImgFiles.splice(index, 1);
                            setImgFile(
                              newImgFiles.length > 0 ? newImgFiles : null
                            );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </IconButton>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </Paper>
            )}
          </div>
        </div>
      </Paper>

      <div className="flex justify-end gap-4">
        <Tooltip title="Reset form">
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            className="transition-all duration-300 hover:shadow-md"
            onClick={() => {
              content.current = "";
              setImgFile(null);
              // Reset the form
              const textarea = document.querySelector("textarea");
              if (textarea) textarea.value = "";
            }}
          >
            Reset
          </Button>
        </Tooltip>
        <Tooltip title="Create post">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateButtonClick}
            startIcon={<CreateIcon />}
            className="transition-all duration-300 hover:shadow-md"
            size="large"
            disabled={isCreating}
          >
            Create Post
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
