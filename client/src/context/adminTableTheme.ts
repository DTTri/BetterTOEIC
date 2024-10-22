import { viVN as viVNCore } from "@mui/material/locale";
import { viVN } from "@mui/x-data-grid/locales";
import { createTheme } from "@mui/material";

const adminTableTheme = createTheme(
  {
    palette: {
      primary: { main: "#00205C" },
    },
  },
  viVN,
  viVNCore
);
export default adminTableTheme;
