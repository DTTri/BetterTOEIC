
import { v4 as uuidv4 } from "uuid";
import google_icon from '@/assets/google_icon.svg';
import authService from '@/services/authService';
import { sUser } from '@/store';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [show, setShow] = React.useState(false);
  const [noti, setNoti] = React.useState("");
  const nav = useNavigate();

  const handleLogin = async () => {

    if(email === '' || password === '') {
      toast.error('Please fill in all fields');
      return;
    }
    if(!email.match(emailRegex)) {
      toast.error('Please enter a valid email');
      return;
    }
    try {
      const response = await authService.login({ email, password });
      if (response.EC === 0) {
        if (rememberMe) {
          localStorage.setItem("token", response.DT.accessToken);
          localStorage.setItem("_id", response.DT._id);
        } else {
          sessionStorage.setItem("token", response.DT.accessToken);
          sessionStorage.setItem("_id", response.DT._id);
        }
        nav('/test');
        toast.success('Login successfully');
        sUser.set((prev) => {
          return (prev.value.info = response.DT);
        });

      }
      else{
        toast.error("Fail to login");
        console.log("Fail to login " + response.EM);
        setNoti(response.EM);
      }
    } catch (error) {
      toast.error("Fail to login");
      console.log(error);
    }
  };

  const getGoogleUrl = () => {
    const url = "https://accounts.google.com/o/oauth2/auth";
    const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
    const state = uuidv4();
    sessionStorage.setItem("state", state);
    const query = {
      client_id: VITE_GOOGLE_CLIENT_ID,
      redirect_uri: VITE_GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      prompt: "consent",
      state,
    };
    const queryString = new URLSearchParams(query).toString();
    return `${url}?${queryString}`;
  };


  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password, rememberMe]);

  console.log(rememberMe);

  return (
    <div
      style={{ transition: "all 0.7s ease" }}
      className={`max-w-[420px] w-full px-9 py-9 bg-[#fff] shadow-lg rounded-[24px] flex flex-col mx-auto duration-700 ${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
    >
      <h3 className="text-[#000] text-sm font-normal">WELCOME BACK</h3>
      <h2 className="text-[#000] text-2xl font-semibold mb-5">
        Log In to your Account
      </h2>
      <div className="flex flex-col gap-5">
        {email === "" || email.match(emailRegex) ? (
          <TextField
            value={email}
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
            color="info"
            style={{
              width: "100%",
              fontSize: "16px",
              fontFamily: "Nunito Sans",
            }}
            id="email-outlined"
            label="Email"
            type="email"
            variant="outlined"
            size="medium"
          />
        ) : (
          <TextField
            value={email}
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
            error
            color="info"
            style={{
              width: "100%",
              fontSize: "16px",
              fontFamily: "Nunito Sans",
            }}
            id="email-outlined"
            label="Email"
            type="email"
            variant="outlined"
            size="medium"
            helperText="Example@gmail.com"
          />
        )}
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
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
            label="Password"
          />
        </FormControl>
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-4 mb-4">
        <div className="flex flex-row gap-2 items-center">
          <input
            onChange={(e) => {
              setRememberMe(e.target.checked);
            }}
            checked={rememberMe}
            type="checkbox"
            name="remember"
            id="remember"
            className="w-[14px] h-[14px]"
          />
          <label htmlFor="remember" className="text-[#000] text-sm font-normal">
            Remember me
          </label>
        </div>
        <Link
          to="/forgot-password"
          className="text-[#000] text-sm font-normal hover:text-slate-500"
        >
          Forgot Password?
        </Link>
      </div>
      <Link to="">
        <Button
          onClick={handleLogin}
          variant="outlined"
          style={{
            backgroundColor: "#3A7EE1",
            color: "#fff",
            fontFamily: "Nunito Sans",
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            padding: "8px 0",
            width: "100%",
            cursor: "pointer",
          }}
        >
          LOG IN
        </Button>
      </Link>
      <span className="text-[#FF0000] text-sm font-normal">{noti}</span>
      <div className="w-full relative my-6">
        <div className="w-full h-[0.5px] border-t-[1px] border-[#c9bfbf]"></div>
        <span className="block text-sm font-bold text-[#212121] bg-[#fff] py-1 px-2 absolute translate-y-[-60%] left-1/2 translate-x-[-50%]">
          or
        </span>
      </div>
      <Link
        to={getGoogleUrl()}
        className="group gap-3 hover:bg-slate-100 hover:shadow-md flex items-center justify-center  bg-[#FAFAFA] border-[#eee] px-3 py-2 border shadow-sm rounded-md sm:text-sm"
      >
        <img className="w-5 h-5 " src={google_icon} alt="" />
        <span className="inline-block text-xs text-[#828282] font-bold ">
          Continue with google
        </span>
      </Link>
      <div className="flex flex-row justify-center mt-5 gap-2">
        <span className="text-[#212121] font-normal text-[16px] ">
          New User?
        </span>
        <Link
          to="/register"
          className="text-[#212121] font-bold text-[16px] underline hover:text-slate-500"
        >
          SIGN UP HERE
        </Link>
      </div>
    </div>
  );
}
