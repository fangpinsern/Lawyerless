import React from "react";

import { Accordion } from "react-accessible-accordion";

import "./Faq.css";
import Questions from "../components/Questions";

function Faq() {
  const faqs = [
    {
      question:
        "Something has come up and I cannot make it for the hearing. What should I do?",
      answer:
        "If you are running late, call the opposing lawyer to inform him that you are on your way, and state your estimated time of arrival. \n If you are late or absent, the Judge may proceed with the case in your absence. Your claim may either be dismissed or judgment may be entered against you."
    },
    {
      question: "I am stupid, what do I do?",
      answer: "Don't be stupid"
    }
  ];
  return (
    <Accordion allowZeroExpanded="true">
      {faqs.map(faq => {
        return <Questions faq={faq} />;
      })}
    </Accordion>
  );
}

export default Faq;
