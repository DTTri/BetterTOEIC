import PasswordChangePopup from "@/components/personal/PasswordChangePopup";
import { Avatar, Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState, useRef } from "react";

export default function PersonalImformationPage() {
  const [showPasswordChangePopup, setShowPasswordChangePopup] =
    useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://images.unsplash.com/photo-1730051470698-f5c95d6d5120?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [fullName, setFullName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-screen py-7 px-52">
      <h2 className="font-bold text-[#000] text-4xl text-center mb-4">
        Thông tin cá nhân
      </h2>
      <div className="bg-[#fff] py-5 px-5 flex flex-col items-center gap-3">
        <Avatar alt="" src={avatarUrl} sx={{ width: 160, height: 160 }} />
        <Button
          variant="contained"
          style={{
            backgroundColor: "#F2F2F2",
            color: "#000",
            borderRadius: "10px",
            fontSize: "16px",
            textTransform: "none",
          }}
          onClick={handleButtonClick}
        >
          Thay ảnh đại diện
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleAvatarChange}
          multiple={false}
        />
        <TextField
          label="Họ tên"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          margin="normal"
          style={{ width: "30%", backgroundColor: "#F8FAFC" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Ngày sinh"
            sx={{ width: "30%", backgroundColor: "#F8FAFC" }}
          />
        </LocalizationProvider>
        <TextField
          label="Số điện thoại"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
          style={{
            width: "30%",
            backgroundColor: "#F8FAFC",
            marginBottom: "20px",
          }}
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
