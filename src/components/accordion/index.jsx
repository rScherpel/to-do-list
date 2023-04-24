import React, { useState } from "react";
import "./styles.css";

function Accordion(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const contentIsEmpty = !props.content.trim();

  return (
    <div className={`accordion ${contentIsEmpty ? "disabled" : ""}`}>
      <div className="accordion-text-part">
        <div className="accordion-header" onClick={toggleAccordion}>
          {props.title}
        </div>
        {isOpen && !contentIsEmpty && (
          <div className="accordion-body">{props.content}</div>
        )}
      </div>
      <div
        className={`arrow ${contentIsEmpty ? "disabled" : ""}`}
        onClick={toggleAccordion}
      >
        {!contentIsEmpty &&
          (isOpen ? (
            <img src="./images/arrow-down.svg" alt="seta para baixo" />
          ) : (
            <img src="./images/arrow-up.svg" alt="seta para cima" />
          ))}
      </div>
    </div>
  );
}

export default Accordion;
