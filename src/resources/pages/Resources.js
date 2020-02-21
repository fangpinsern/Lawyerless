import React from "react";
import { Accordion } from "react-accessible-accordion";

import Questions from "../components/Questions";
import Card from "../../shared/UIElements/Card";
import ContactUs from "../components/ContactUs";

function Faq() {

    const faqs = [
        {
            key: 1,
            question:
                "Small Claims Tribunal",
            answer:
                <p>Claims must be filed at <a href='https://www.statecourts.gov.sg/CJTS/#!/index1'> Small Claims Tribunal</a></p>
        },
        {
            key: 2,
            question: "Magistrate Court",
            answer: <p>Filing of Documents have to be done at  <a href="https://www.google.com/maps?ll=1.285234,103.844725&z=15&t=m&hl=en-SG&gl=US&mapclient=embed&q=1%C2%B017%2706.8%22N+103%C2%B050%2741.0%22E+1.285234,+103.844725@1.285234,103.844725"> CrimsonLogic Service Bureau - Chinatown Point</a></p>
        },
        {
            key: 3,
            question: "Form 2: Writ of Summons",
            answer: <p>A writ of summons commences the action and must be in <a href="https://www.supremecourt.gov.sg/docs/default-source/default-document-library/civil-proceedings/writ-of-summons.pdf"> Form 2 of the Rules of Court</a></p>
        },
        {
            key: 4,
            question: "Forms 3: List of Issues in Dispute and List of Witnesses",
            answer: <p><a href="https://epd.statecourts.gov.sg/downloads/Appendix-A-Form-3.pdf">List of Issues in Dispute and List of Witnesses</a> informs the Court and the defendant of the areas of dispute and the witnesses that will be called to give evidence in support of your case. </p>

        },
        {
            key: 5,
            question: "Forms 5, 6A, 6B: Application for Mareva Injunctions",
            answer: <p>A Mareva Injunction injunction to freeze assets of the other party to prevent them from taking their assests abroad to frustrate a potential judgement and applicants are required to prepare their orders in accordance with the Following Forms: <li><a href="https://epd.statecourts.gov.sg/downloads/Appendix-A-Form-5.pdf">Form 5: Search Order</a></li> <li><a href="https://epd.statecourts.gov.sg/downloads/Appendix-A-Form-6A.pdf">Form 6A: Worldwide Mareva Injunction</a></li> <li><a href="https://epd.statecourts.gov.sg/downloads/Appendix-A-Form-6B.pdf">Form 6B: Mareva Injunction limited to assets within jurisdiction</a></li></p>

        },
        {
            key: 6,
            question: "Forms 7: ADR Form",
            answer: <p><a href="https://epd.statecourts.gov.sg/downloads/Appendix-A-Form-7.pdf">ADR Form</a> informs the Court and the defendant of which Alternative Dispute REsolution option you prefer to help resolve the case</p>

        },

        {
            key: 7,
            question: "Forms 10: Memorandum of Appearance",
            answer: <p>A <a href="https://sso.agc.gov.sg/SL/SCJA1969-R5?ProvIds=SaA-#SaA-">Memorandum of Appearance</a> states your intention to appear in court and challenge the claim. It must be filed within 8 days of receiving the Writ of Summons</p>

        },
        {
            key: 8,
            question: "Self-Help: Law Society Pro Bono Clinic",
            answer: <p><a href="https://www.lawsocprobono.org/Pages/default.aspx ">Law Society Pro-Bono Services</a></p>
        },
        {
            key: 9,
            question: "Self-Help: Legal Clinic",
            answer: <p><a href="https://legalclinics.sg">Legal Clinics</a> offers a free-of-charge service for an hour of a lawyer's time, and they can help streamline the application process and advice</p>
        },
        {
            key: 10,
            question: "Location - State Court",
            answer: <p><a target="_blank" href="https://goo.gl/maps/1rg6cnoi4b7AaFqH6"> <img alt="State Court Location" width="395" height="300" src="https://www.statecourts.gov.sg/cws/Resources/Documents/SC%20Towers%20Map_v2.jpg"></img></a></p>
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
                <Accordion allowZeroExpanded="true">
                    {faqs.map(faq => {
                        return <Questions key={faq.key} faq={faq} />;
                    })}
                </Accordion>
                <br />
                <ContactUs />
        </React.Fragment>
    );
}

export default Faq;
