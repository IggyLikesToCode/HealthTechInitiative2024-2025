import logo from "./logo.svg";
import "./App.css";
import theme from "./theme.jsx";
import React from "react";
import Home from "./tabs/Home";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Navbar from "./components/navbar.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Home />
    </ThemeProvider>
  );
}

export default App;
