import React, { Children, useState } from "react";
import Button from "../../components/Button";

export default function TextExpander({
  children,
  numberOfText = 10,
  expandedText = "show less",
  notExpandedText = "read more",
}) {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div>
      
        {isExpand ? (
          <p>{children} </p>
        ) : (
          <p>{children.split(" ").slice(0, numberOfText).join(" ") + "..."}</p>
        )}{" "}
        <Button onClick={() => setIsExpand(!isExpand)}>
          {isExpand ? expandedText : notExpandedText}
        </Button>
      
    </div>
  );
}
