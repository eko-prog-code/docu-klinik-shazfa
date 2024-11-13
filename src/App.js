// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Ass from "./Ass";
import Cppt from "./Cppt";
import Edukasi from "./Edukasi";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ass" element={<Ass />} />
        <Route path="/cppt" element={<Cppt />} />
        <Route path="/edukasi" element={<Edukasi />} />
      </Routes>
    </Router>
  );
}

export default App;
