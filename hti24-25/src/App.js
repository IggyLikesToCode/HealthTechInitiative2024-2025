import logo from "./logo.svg";
import "./App.css";
import theme from "./theme.jsx";
import React from "react";
import Home from "./tabs/Home";
import Report from "./tabs/Report";
import Map from "./tabs/Map";
import Resources from "./tabs/Resources";
import TestKits from "./tabs/TestKits";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/map" element={<Map />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/testkits" element={<TestKits />} />
          <Route></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
