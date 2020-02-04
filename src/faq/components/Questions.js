import React from "react";

import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

import "./Questions.css";

import "react-accessible-accordion/dist/fancy-example.css";

function Questions(props) {
  return (
    
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>{props.faq.question}</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>{props.faq.answer}</p>
      </AccordionItemPanel>
    </AccordionItem>
  );
}

export default Questions;
