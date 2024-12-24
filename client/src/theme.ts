// filepath: /src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00205C", // Define your primary color here
    },
    secondary: {
      main: "#D0E3FF", // Define your secondary color here
    },
    error: {
      main: "#FF0000", // Define your error color here
    },
    warning: {
      main: "#FFC107", // Define your warning color here
    },
    info: {
      main: "#2196F3", // Define your info color here
    },
    success: {
      main: "#BCFFE3", // Define your success color here
    },
  },
});

export default theme;
