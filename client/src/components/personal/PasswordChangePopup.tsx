import { User } from "@/entities";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";

export default function PasswordChangePopup({  onClose }: { onClose: () => void }) {
  const [oldPassword, setoldPassword] = React.useState("");
  const [showOldPassword, setshowOldPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [retypePassword, setRetypePassword] = React.useState("");
  const [showRetypePassword, setShowRetypePassword] = React.useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" max-w-[530px] w-full rounded-3xl bg-[#fff]  py-5 px-8">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-row items-center mb-4">
          <h2 className="text-[#000] flex-1 text-3xl font-bold text-center">Đổi mật khẩu</h2>
          <button
            onClick={onClose}
            className="bg-black text-white block">x</button>
        </div>
        <FormControl variant="outlined" style={{width: "100%", backgroundColor: "#F8FAFC", marginBottom: "12px"}}>
          <InputLabel htmlFor="outlined-adornment-password">
            Old Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setoldPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showOldPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => setshowOldPassword(!showOldPassword)}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Old Password"
          />
        </FormControl>
        <FormControl variant="outlined" style={{width: "100%", backgroundColor: "#F8FAFC", marginBottom: "12px"}}>
          <InputLabel htmlFor="outlined-adornment-password">
            New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
          />
        </FormControl>
        <FormControl variant="outlined" style={{width: "100%", backgroundColor: "#F8FAFC"}}>
          <InputLabel htmlFor="outlined-adornment-password">
            Retype New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showRetypePassword ? "text" : "password"}
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showRetypePassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                  edge="end"
                >
                  {showRetypePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Retype New Password"
          />
        </FormControl>
      </div>
    </div>
    </div>
    
  );
}
