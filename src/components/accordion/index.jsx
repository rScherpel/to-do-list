import React, { useState } from "react";

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
    </div>
  );
}

export default Accordion;