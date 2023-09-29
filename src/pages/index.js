import React, { useState, useEffect } from "react";
import NextButton from "../components/NextButton";
import PrevButton from "../components/PrevButton";
import "../styles/style.css";
import PageImage from "../images/IMG_20230912_160132_121-removebg-preview.png";
import PageImage2 from "../images/IMG_20230912_160134_141-removebg-preview.png";

const Home = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateWindowHeight);

    setWindowHeight(window.innerHeight);

    return () => {
      window.removeEventListener("resize", updateWindowHeight);
    };
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Title of the Page</h1>
      </div>
      <div className="content">
        <div className="image-container">
          <img
            src={PageImage}
            alt="Page"
            className="image"
          />
        </div>
        <div className="image-container">
          <img
            src={PageImage2}
            alt="Page2"
            className="image2"
          />
        </div>
      </div>
      <div className="button-container">
        <PrevButton to="/contact" />
        <NextButton to="/about" />
      </div>
      <div className="navigationDots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>


  );
};

export default Home;
