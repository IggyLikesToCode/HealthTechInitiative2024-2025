import logo from "./logo.svg";
import "./App.css";
app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});

import React from "react";
import Navbar from "./components/navbar";

function App() {
  return <Navbar />;
}

export default App;
