import React from "react";
import { Link } from "react-router-dom";

const NextButton = ({ to }) => {
  return (
    <Link to={to}>
      <button>Next</button>
    </Link>
  );
};

export default NextButton;
