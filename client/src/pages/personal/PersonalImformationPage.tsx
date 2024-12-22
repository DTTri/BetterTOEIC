import PasswordChangePopup from "@/components/personal/PasswordChangePopup";
import { Avatar, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import http from "@/services/http";
import { userService } from "@/services";
import { sUser } from "@/store";
import theme from "@/theme";
import { toast } from "react-toastify";

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
        toast("Upload image failed", { type: "error" });
      }
      console.log(result);
      setAvatarUrl("https://seuit-qlnt.s3.amazonaws.com/" + response.key);
      key = response.key;
      return file;
    } catch (error) {
      toast("Upload image failed: " + error, { type: "error" });
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
        toast("Update successfully", { type: "success" });
      } else {
        toast("Update failed", { type: "error" });
      }
    } catch (error) {
      toast("Update failed: " + error, { type: "error" });
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
        Personal Information
      </h2>
      <div className="bg-[#fff] py-5 px-5 flex flex-col items-center gap-3 relative">
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
          label="Fullname"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          margin="normal"
          style={{ width: "30%", backgroundColor: "#F8FAFC" }}
        />

        <div className="w-[40%] flex flex-row justify-center ">
          <Button
            onClick={() => setShowPasswordChangePopup(true)}
            variant="contained"
            style={{
              backgroundColor: "#F2F2F2",
              color: "#000",
              fontSize: "14px",
              textTransform: "none",
              position: "absolute",
              left: 20,
              bottom: 20,
            }}
          >
            Change Password
          </Button>
          <Button
            onClick={handleUpdateButtonClick}
            variant="outlined"
            style={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              fontSize: "14px",
              textTransform: "none",
            }}
          >
            Update
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
