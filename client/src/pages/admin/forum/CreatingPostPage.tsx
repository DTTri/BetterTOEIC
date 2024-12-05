import LoadingProgress from "@/components/LoadingProgress";
import CreatePostDTO from "@/entities/DTOS/CreatePostDTO";
import { forumService } from "@/services";
import http from "@/services/http";
import { sUser } from "@/store";
import sForum from "@/store/forumStore";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Dropzone, { IFileWithMeta, StatusValue } from "react-dropzone-uploader";
import { useNavigate } from "react-router-dom";

export default function CreatingPostPage() {
  const SUser = sUser.use((state) => state.info);
  const [user, setUser] = useState(SUser);
  const nav = useNavigate();
  const content = useRef<string>("");
  const [images, setImages] = useState<string[]>([]);
  const dropzoneRef = useRef<any>(null);

  useEffect(() => {
    setUser(SUser);
  }, [SUser]);

  if (!user) {
    return <LoadingProgress />;
  }
  
  const handleChangeStatus = (
    { meta }: { meta: { name: string } },
    status: StatusValue
  ) => {
    console.log(status, meta);
  };

  const handleSubmit = async (files: IFileWithMeta[]) => {
    try {
      const uploadPromises = files.map(async (fileWithMeta) => {
        const file = fileWithMeta.file;
        const response = await http.get(
          `file/presigned-url?fileName=${file.name}&contentType=${file.type}`
        );
        console.log(response);

        // PUT request: upload file to S3
        const result = await fetch(response.presignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
        if (!result.ok) {
          throw new Error("Failed to upload image to S3");
        }
        console.log(result);
        setImages((previewImage) => [...previewImage, "https://seuit-qlnt.s3.amazonaws.com/" + response.key]);
      });
      await Promise.all(uploadPromises);
      setTimeout(() => {
        console.log("Images uploaded:", images);
      }, 2000);
      return true;
    } catch (error) {
      console.error("Error uploading images:", error);
      return false;
    }
  };
  console.log("image console" + images);

  const handleCreatePost = async () => {
    console.log("iamge in function" + images)
    const newPost: CreatePostDTO = {
      content: content.current,
      contentImage: images,
      creator: {
        _id: user._id,
        username: user.name,
        avatar: user.avatar
      }
    };
    try {
      const response = await forumService.createPost(newPost);
      if (response.EC === 0) {
        sForum.set(pre => pre.value.posts.push(response.DT));
        if(user.isAdmin) {
          nav("/admin/forum");
        }
        else {
          nav("/forum");
        }
      } else {
        console.error("Failed to add product:", response.EM);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCreateButtonClick = async () => {
    if (dropzoneRef.current && dropzoneRef.current.files.length > 0) {
      const uploadSuccess = await handleSubmit(dropzoneRef.current.files);
      if (uploadSuccess && images.length === dropzoneRef.current.files.length) {
        handleCreatePost();
      }
    } else {
      handleCreatePost();
    }
  };


  console.log(images);

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
          <Dropzone
            ref={dropzoneRef}
            onChangeStatus={handleChangeStatus}
            maxFiles={5}
            multiple={true}
            inputContent="Drop files here or click to browse"
            accept="image/*"
            submitButtonDisabled={false}
            canRemove={true}
            classNames={{
              dropzone: `w-full h-[150px] bg-gray-100 text-[20px] text-gray-500 flex items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-md`,
              submitButton: "hidden",
              previewImage: "w-full rounded-md flex items-center justify-center",
              submitButtonContainer: "hidden",
              inputLabel: "text-blue-500 hover:text-blue-700 cursor-pointer",
            }}
          />
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
        <Button onClick={handleCreateButtonClick} variant="contained" style={{ backgroundColor: "#00205C" }}>
          Create
        </Button>
      </div>
    </div>
  );
}
