import React from "react";

import { Accordion } from "react-accessible-accordion";

import "./Faq.css";
import Questions from "../components/Questions";
import Card from "../../shared/UIElements/Card";
import ContactUs from "../components/ContactUs";

function Faq() {
  const faqs = [
    {
      question:
        "Something has come up and I cannot make it for the hearing. What should I do?",
      answer:
        "If you are running late, call the opposing lawyer to inform him that you are on your way, and state your estimated time of arrival. If you are late or absent, the Judge may proceed with the case in your absence. \n Your claim may either be dismissed or judgment may be entered against you."
    },
    {
      question: "I am stupid, what do I do?",
      answer: "Don't be stupid"
    }
  ];
  return (
    <Card>
      <Accordion allowZeroExpanded="true">
        {faqs.map(faq => {
          return <Questions faq={faq} />;
        })}
      </Accordion>
      <br />
      <ContactUs />
    </Card>
  );
}

export default Faq;
