import PasswordChangePopup from "@/components/personal/PasswordChangePopup";
import { Avatar, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import http from "@/services/http";
import { userService } from "@/services";
import { sUser } from "@/store";

export default function PersonalImformationPage() {
  const currentUser = sUser.use((v) => v.info);
  const [showPasswordChangePopup, setShowPasswordChangePopup] =
    useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  let key = "";
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser]);

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
      const file = await handleSubmit(selectedFile);
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
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              setAvatarUrl(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}
        />
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
