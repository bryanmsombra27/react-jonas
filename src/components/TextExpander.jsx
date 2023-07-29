import { useState } from "react";
import "./TextExpander.css";

const TextExpander = ({
  children,
  className,
  collapseButtonText = "Collapse text",
  expandButtonText = "Show text",
  buttonColor = "#ff6622",
  collapsedNumWords = 20,
}) => {
  const [collapse, setCollapse] = useState(false);
  const toggleButton = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <>
      <div className={className}>
        {collapse ? children.slice(1, collapsedNumWords) : children}
      </div>
      <button
        style={{
          backgroundColor: buttonColor,
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          margin: "15px",
          cursor: "pointer",
        }}
        onClick={toggleButton}
      >
        {collapse ? expandButtonText : collapseButtonText}
      </button>
    </>
  );
};

export default TextExpander;
