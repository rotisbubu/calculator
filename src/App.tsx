import React from "react";
import logo from "./logo.png";
import "./App.css";
import Calculator from "./components/calculator";
import SupportPage from "./components/supportForm";
import SupportTicket from "./components/supportTicket";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/SupportPage" element={<SupportPage />} />
        <Route path="/SupportTicket" element={<SupportTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
