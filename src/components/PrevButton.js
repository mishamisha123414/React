import React from "react";
import { Link } from "react-router-dom";

const PrevButton = ({ to }) => {
  return (
    <Link to={to}>
      <button>Prev</button>
    </Link>
  );
};

export default PrevButton;
