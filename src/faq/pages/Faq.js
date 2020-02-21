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
      answer: <p>More information can be found at <a href="https://www.statecourts.gov.sg/cws/SmallClaims/Pages/GeneralInformation.aspx"> Small Claims Tribunal </a></p>
    },
    {
      key: 3,
      question: "How do I get a seat in the courtroom if I want to watch a trial?",
      answer: "Public access to courtroom is based on first-come-first-seated basis. The courtroom will open 30 minutes before the hearing starts"
    },
    {
      key: 4,
      question: "What are some important courtroom etiquette?",
      answer: <p>When entering or leaving a courtroom where the Court is in session, it is customary to bow towards the State Crest. </p>

    },
    {
      key: 5,
      question: "Can I take photo or video recording during the proceedings as evidence?",
      answer: "No, It will be clear once you go in that making video and/or image recordings of any kind will be prohibited  in all hearings and sessions in open Court. Audio recording during a hearing is strictly prohibited without prior approval of the Judge presiding over the hearing (when in doubt, ASK!)"
    },
    {
      key: 6,
      question: "How long would the legal process usually take?",
      answer: "It is difficult to give a concrete answer because of the many intricacies of the court process (will your case go on appeal? Will the defendant apply to have the default judgment set aside?). Therefore the process from pre-trial processes to post-trial follow-ups will take anywhere between several weeks to a few months, depending on the parties to the trial. The brief timeline for the court process is illustrated below:"
    },
    {
      key: 7,
      question: "Do my family members also need to dress up to watch my trial?",
      answer: "Yes, all visitors are also required to wear appopriate attire, which includes smart casual wear, office wear, and traditional dresses."
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
      <Card className="faq-format">
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
