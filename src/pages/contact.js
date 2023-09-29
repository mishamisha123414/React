import React from "react";
import NextButton from "../components/NextButton";
import PrevButton from "../components/PrevButton";


function Contact() {
  return <div>
    <h1>Contact Page</h1>
    <NextButton to="/" />
    <PrevButton to="/about" />
    </div>;
}

export default Contact;
