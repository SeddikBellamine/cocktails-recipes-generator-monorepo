import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffd209",
      contrastText: "#fff",
    },
    secondary: {
      main: "#4caf50",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffd209",
          color: "black",
          boxShadow: "6px 6px rgba(0,0,0,1)",
          border: "1px solid black",
          borderRadius: "0px",
          "&:hover": {
            backgroundColor: "#ffd209",
          },
        },
        containedSecondary: {
          "&:hover": {
            backgroundColor: "#388e3c",
          },
        },
      },
    },
  },
});

export default theme;
