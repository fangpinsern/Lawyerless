import React from "react";

import { Accordion } from "react-accessible-accordion";

import "./Faq.css";
import Questions from "../components/Questions";
import Card from "../../shared/UIElements/Card";
import ContactUs from "../components/ContactUs";

function Faq() {
  const faqs = [
    {
      key: 1,
      question:
        "Something has come up and I cannot make it for the hearing. What should I do?",
      answer:
        "If you are running late, call the opposing lawyer to inform him that you are on your way, and state your estimated time of arrival. If you are late or absent, the Judge may proceed with the case in your absence. \n Your claim may either be dismissed or judgment may be entered against you."
    },
    {
      key: 2,
      question: "How do I file Small Claims Tribunal online?",
      answer: "More information can be found at: https://www.statecourts.gov.sg/cws/SmallClaims/Pages/GeneralInformation.aspx"
    }
  ];
  return (
    <React.Fragment>
      <div className="faq-image">
        <img
          src={require("../../homePage/images/sebastian-pichler-bAQH53VquTc-unsplash.png")}
          alt="This is the faq page"
        />
      </div>
      <Card>
        <Accordion allowZeroExpanded="true">
          {faqs.map(faq => {
            return <Questions key={faq.key} faq={faq} />;
          })}
        </Accordion>
        <br />
        <ContactUs />
      </Card>
    </React.Fragment>
  );
}

export default Faq;
