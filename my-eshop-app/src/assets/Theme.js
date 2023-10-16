import { createTheme } from "@mui/material"; 

const Theme = new createTheme({
    typography:{
        fontFamily:"monospace"
    },
    palette: {
        primary: {
          light: "#45c09f",
          main: "#00a278",
          dark: "#00845c",
          contrastText: "#fff",
        },
      }
})

export default Theme;