import React from "react";

import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

import "./Questions.css";

import "../pages/accordion.css";

function Questions(props) {
  return (
    <AccordionItem className="faq-accordion">
      <AccordionItemHeading>
        <AccordionItemButton>{props.faq.question}</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div>{props.faq.answer}</div>
      </AccordionItemPanel>
    </AccordionItem>
  );
}

export default Questions;
