import logo from "./logo.svg";
import "./App.css";
import theme from "./theme.jsx";
import React from "react";
import Home from "./tabs/Home";
import Report from "./tabs/Report";
import Map from "./tabs/Map";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
