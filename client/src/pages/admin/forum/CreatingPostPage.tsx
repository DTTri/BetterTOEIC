import LoadingProgress from "@/components/LoadingProgress";
import CreatePostDTO from "@/entities/DTOS/CreatePostDTO";
import { forumService } from "@/services";
import http from "@/services/http";
import { sUser } from "@/store";
import sForum from "@/store/forumStore";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreatingPostPage() {
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
  };

  return (
    <div className="w-full min-h-screen rounded-xl bg-white text-black flex flex-col gap-4 p-4">
      <div className="w-full">
        <p className="text-xl font-bold mb-1">Create Post: </p>
        <textarea
          placeholder="Type content here..."
          className="w-full h-96 p-2 border border-black rounded-sm"
          style={{
            resize: "none",
          }}
          onChange={(e) => (content.current = e.target.value)}
        />
      </div>
      <div className="image-container flex flex-col justify-center items-center gap-4 overflow-auto max-h-96">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setImgFile(Array.from(e.target.files));
            }
          }}
          className=" bg-gray-100 text-[16px] text-gray-500 flex items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-md"
        />
        <div className="bg-gray-100 text-[16px] text-gray-500 w-full p-2 preview-container flex flex-wrap items-center gap-4">
          {imgFile &&
            imgFile.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="w-32 h-32 object-cover rounded-md"
              />
            ))}
        </div>
      </div>
      <div className="w-full flex justify-end gap-2 items-center">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#D0E3FF",
            color: "#1E3A8A",
          }}
        >
          Refresh
        </Button>
        <Button
          onClick={handleCreateButtonClick}
          variant="contained"
          style={{ backgroundColor: "#00205C" }}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
