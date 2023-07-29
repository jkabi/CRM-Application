import "./App.css";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Engineer from "./pages/Engineer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
function App() {
  const defaulttheme = createTheme();
  return (
    <>
      <ThemeProvider theme={defaulttheme}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Customer" element={<Customer />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Engineer" element={<Engineer />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
