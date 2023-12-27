import Stars from "./widgets/Stars"
import { ThemeProvider, createTheme } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AppBar from "./widgets/AppBar";
import AllSites from "./pages/AllSites";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0A1426",
      light: "#F59495",
      dark: "#E5E7FF",
    },
    secondary: {
      main: "#250A31",
      dark: "#13161C",
      light: "#F3F4F6",
    },
    error: {
      main: "#860000",
    },
    success: {
      main: "#00440f",
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

function App() {

  return (
    <>

      <ThemeProvider theme={theme}>
        <Stars />
        <AppBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/sites" element={<AllSites />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
