import React from "react";

export default function Header() {
  // Split the text into individual characters for hover effect
  const text = "APOD NASA NEWS";
  const letters = text.split("");

  return (
    <div>
      <div className="header">
        <p className="letterHeader">
          {letters.map((letter, index) => (
            <span
              key={index}
              style={{
                animationDelay: `${index * 0.1}s`,
                display: letter === " " ? "inline" : "inline-block",
              }}
            >
              {letter}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
