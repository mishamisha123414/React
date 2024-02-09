import React from "react";
//import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/index";
import About from "./pages/about";
import Contact from "./pages/contact";
import RegistrationPage from "../src/components/Registration";
import AuthorizationPage from "./components/Authorization";
import HelloPage from "../src/components/Hello"
import Congratulations from '../src/components/Congratulations'; 
import Logout from "../src/components/Logout";
import Role from "../src/components/Role";
import { GoogleLogin } from '@react-oauth/google';
import jwt from "jwt-decode";


function App() {
    const responseMessage = (response) => {
        console.log(jwt(response.credential));
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
      <Router>
        <Routes>
          <Route path="/" element={<AuthorizationPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hello" element={<HelloPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<GoogleLogin onSuccess={responseMessage} onError={errorMessage} />} />
          <Route path="/auth" element={<AuthorizationPage />} />
          <Route path="/congratulations" element={<Congratulations />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/role" element={<Role />} />

        </Routes>
      </Router>
    );
  }

export default App;
//<Route path="/congratulations" exact component={Congratulations} />
//<Route path="/logout" element={<Logout />} />