import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/index";
import About from "./pages/about";
import Contact from "./pages/contact";
import RegistrationPage from "../src/components/Registration"; // Імпортуємо сторінку реєстрації

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registration" element={<RegistrationPage />} /> {/* Додаємо маршрут для сторінки реєстрації */}
      </Routes>
    </Router>
  );
}

export default App;
