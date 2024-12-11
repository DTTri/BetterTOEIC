import PasswordChangePopup from "@/components/personal/PasswordChangePopup";
import { Avatar, Button, TextField } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Dropzone, { IFileWithMeta, StatusValue } from "react-dropzone-uploader";
import http from "@/services/http";
import { userService } from "@/services";
import { sUser } from "@/store";

export default function PersonalImformationPage() {
  const currentUser = sUser.use((v) => v.info);
  const [showPasswordChangePopup, setShowPasswordChangePopup] =
    useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://images.unsplash.com/photo-1730051470698-f5c95d6d5120?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [fullName, setFullName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<IFileWithMeta | null>(null);
  const dropzoneRef = useRef<Dropzone | null>(null);
  let key = "";
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser]);

  const handleChangeStatus = (
    { meta, file }: { meta: { name: string }; file: File },
    status: StatusValue
  ) => {
    if (status === "done") {
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   setAvatarUrl(e.target?.result as string);
      // };
      // reader.readAsDataURL(file);
      setAvatarUrl(URL.createObjectURL(file));
      setSelectedFile({ meta, file });
    }
    console.log(status, meta);
  };

  const handleSubmit = async (file: File) => {
    try {
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
      setAvatarUrl("https://seuit-qlnt.s3.amazonaws.com/" + response.key);
      key = response.key;
      return file;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleUpdateInfo = async () => {
    try {
      console.log(avatarUrl);
      const response = await userService.updateUser(currentUser._id, {
        name: fullName,
        avatar: "https://seuit-qlnt.s3.amazonaws.com/" + key,
      });
      console.log(response);

      if (response.EC === 0) {
        console.log("Update success");
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleUpdateButtonClick = async () => {
    if (selectedFile) {
      const file = await handleSubmit(selectedFile.file);
      if (file === null) {
        return;
      } else {
        handleUpdateInfo();
      }
    }
    // Handle other update logic here, e.g., updating the full name
    console.log("Full name:", fullName);
  };

  return (
    <div className="w-full h-screen py-7 px-52">
      <h2 className="font-bold text-[#000] text-4xl text-center mb-4">
        Thông tin cá nhân
      </h2>
      <div className="bg-[#fff] py-5 px-5 flex flex-col items-center gap-3">
        <Avatar alt="" src={avatarUrl} sx={{ width: 160, height: 160 }} />
        <div className="upload-button w-12 h-6 flex justify-center items-center">
          <Dropzone
            ref={dropzoneRef}
            onChangeStatus={handleChangeStatus}
            maxFiles={1}
            multiple={false}
            accept="image/*"
            submitButtonDisabled={false}
            canRemove={true}
            inputContent={null}
            classNames={{
              dropzone: `w-12 bg-gray-100`,
              submitButton: "hidden",
              previewImage: "hidden",
              submitButtonContainer: "hidden",
              input: "cursor-pointer",
              inputLabel: "",
              inputLabelWithFiles: "w-full",
            }}
          />
        </div>
        <TextField
          label="Họ tên"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          margin="normal"
          style={{ width: "30%", backgroundColor: "#F8FAFC" }}
        />

        <div className="w-[40%] flex flex-row justify-between ">
          <Button
            onClick={() => setShowPasswordChangePopup(true)}
            variant="outlined"
            style={{
              backgroundColor: "#F2F2F2",
              color: "#000",
              borderRadius: "20px",
              fontSize: "16px",
              textTransform: "none",
            }}
          >
            Đổi mật khẩu
          </Button>
          <Button
            onClick={handleUpdateButtonClick}
            variant="outlined"
            style={{
              backgroundColor: "#FFDCDC",
              color: "#000",
              borderRadius: "20px",
              fontSize: "16px",
              textTransform: "none",
            }}
          >
            Cập nhật
          </Button>
        </div>
      </div>

      {showPasswordChangePopup && (
        <PasswordChangePopup
          onClose={() => setShowPasswordChangePopup(false)}
        />
      )}
    </div>
  );
}
