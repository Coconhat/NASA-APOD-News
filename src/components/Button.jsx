import React from "react";


function Button({ onClick, children, className }) {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
