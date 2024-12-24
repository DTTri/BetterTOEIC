import { userService } from "@/services";
import { sUser } from "@/store";
import theme from "@/theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

export default function PasswordChangePopup({
  onClose,
}: {
  onClose: () => void;
}) {
  const [oldPassword, setoldPassword] = React.useState("");
  const [showOldPassword, setshowOldPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [retypePassword, setRetypePassword] = React.useState("");
  const [showRetypePassword, setShowRetypePassword] = React.useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !password || !retypePassword) {
      toast("Please fill all fields", { type: "error" });
      return;
    }
    if (password !== retypePassword) {
      toast("Retype password does not match", { type: "error" });
      return;
    }
    if (password === oldPassword) {
      toast("New password must be different from old password", {
        type: "error",
      });
      return;
    }
    try {
      const res = await userService.changePassword(sUser.value.info._id, {
        oldPassword,
        newPassword: password,
      });
      console.log(res);
      if (res.EC === 0) {
        toast("Reset password succcessfully", { type: "success" });
        onClose();
      }
    } catch (err) {
      console.log(err);
      toast("Reset password failed", { type: "error" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" max-w-[530px] w-full rounded-3xl bg-[#fff]  py-5 px-8">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-row items-center mb-4">
            <h2 className="text-[#000] flex-1 text-[27px] font-bold text-center">
              Change password
            </h2>
            <CloseIcon
              sx={{ width: 28, height: 28 }}
              className="cursor-pointer hover:bg-slate-200"
              onClick={onClose}
            />
          </div>
          <FormControl
            variant="outlined"
            style={{
              width: "100%",
              backgroundColor: "#F8FAFC",
              marginBottom: "12px",
            }}
          >
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
                      showOldPassword
                        ? "hide the password"
                        : "display the password"
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
          <FormControl
            variant="outlined"
            style={{
              width: "100%",
              backgroundColor: "#F8FAFC",
              marginBottom: "12px",
            }}
          >
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
                      showPassword
                        ? "hide the password"
                        : "display the password"
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
          <FormControl
            variant="outlined"
            style={{ width: "100%", backgroundColor: "#F8FAFC" }}
          >
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
          <div className="w-full buttons flex flex-row mt-5 justify-center gap-4">
            <Button
              onClick={onClose}
              variant="contained"
              style={{
                backgroundColor: "rgba(215, 246, 255, 0.31)",
                color: "#000",
                fontSize: "16px",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                fontSize: "16px",
                textTransform: "none",
              }}
              onClick={handleChangePassword}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
