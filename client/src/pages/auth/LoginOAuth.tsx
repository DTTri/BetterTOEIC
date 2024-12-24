import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";
import { userService } from "@/services";
import { sUser } from "@/store";
import theme from "@/theme";
export default function LoginOauth() {
  console.log("LoginOauth");
  const [pending, setPending] = useState(true);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const accessToken = searchParams.get("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (userId && accessToken) {
      const fetchUser = async () => {
        try {
          const res = await userService.getUser(userId);
          if (res.EC === 0) {
            sUser.set((prev) => {
              return (prev.value.info = res.DT);
            });
            localStorage.setItem("token", accessToken);
            localStorage.setItem("_id", userId);
            navigate("/test");
          } else {
            console.log("Faild to login with Google: " + res.EM);
            setPending(false);
          }
        } catch (error) {
          console.log(error);
          setPending(false);
        }
      };
      fetchUser();
    }
  }, [accessToken, navigate, searchParams, userId]);
  return (
    <div className="body-container">
      <div className="flex flex-col gap-4 mt-auto h-screen justify-center caret-transparent">
        {pending ? (
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="text-primary max-w-[400px] max-h-[400px]">
              <CircularProgress color="inherit" />
            </div>
            <h2 className="text-2xl font-bold text-center text-primary">
              Pending . . .
            </h2>
          </div>
        ) : (
          <div className="container mx-auto h-screen flex flex-col items-center justify-center">
            <SentimentVeryDissatisfiedIcon
              sx={{
                fontSize: 200,
                color: theme.palette.primary.main,
              }}
            />
            <h1 className="text-[100px] font-bold text-primary">500</h1>
            <h2 className="text-[30px] opacity-60 font-bold">
              Internal Server Error
            </h2>
            <p className="opacity-50 text-center">
              Server is not responding. Please try another login methods or
              contact the administrator.
            </p>
            <Link
              to={"/login"}
              className="bg-primary rounded-md mt-3 caret-transparent font-semibold text-white py-3 px-5 transition-all hover:bg-[#e1b34a]"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
