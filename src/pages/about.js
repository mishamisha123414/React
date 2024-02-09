import React from "react";
import { Link, NavLink } from "react-router-dom";
import NextButton from "../components/NextButton"; 
import PrevButton from "../components/PrevButton";



function About() {
  return <div>
    <h1>About Page</h1>
    <NextButton to="/contact" />
    <PrevButton to="/" />
    <Link to={"/"}>
      link
      </Link>
    </div>;
    
}

export default About;
