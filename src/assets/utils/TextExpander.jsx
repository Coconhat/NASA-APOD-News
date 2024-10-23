import React, { useState } from "react";
import Button from "../../components/Button"; // Ensure this is the correct path

export default function TextExpander({
  children,
  numberOfText = 10,
  expandedText = "Show less",
  notExpandedText = "Read more",
}) {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div>
      {isExpand ? (
        <p>{children}</p>
      ) : (
        <p>{children.split(" ").slice(0, numberOfText).join(" ") + "..."}</p>
      )}
     
    </div>
  );
}
