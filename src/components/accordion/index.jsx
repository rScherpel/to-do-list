import React, { useState } from "react";
import "./styles.css";

function Accordion(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        {props.title}
      </div>
      {isOpen && <div className="accordion-body">{props.content}</div>}
      <div className="arrow" onClick={toggleAccordion}>
        {isOpen ? (
          <img src="./images/arrow-down.svg" alt="seta para baixo" />
        ) : (
          <img src="./images/arrow-up.svg" alt="seta para cima" />
        )}
      </div>
    </div>
  );
}

export default Accordion;