import React, { useState, useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hooks";
import Questions from "../../faq/components/Questions";

function MagistratesCourts(props) {
  const MagForm = {
    "Filing of the Summons": {
      value: "",
      isValid: false
    },
    "Servicing of the Writ": {
      value: "",
      isValid: false
    },
    "Has the defendant filed the Memorandum of Appearance within 8 days of receiving the Writ?": {
      value: "",
      isValid: false
    },
    "Has the defendant filed and served a defence upon you within 22 days of receiving the Writ?": {
      value: "",
      isValid: false
    },
    "Replying to the defendant and defence to the counterclaim": {
      value: "",
      isValid: false
    }
  };

  // Whether next appears depends on previous value
  const arrKeys = Object.keys(MagForm);
  const numSteps = arrKeys.length;

  const [magFormState, magFormInputHandler, setFormData] = useForm(
    MagForm,
    false
  );

  const [shortCircuit, setShortCircuit] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("magForm");
    if (data) {
      const parseData = JSON.parse(data);
      setFormData(parseData.inputs, parseData.isValid);
    }
  }, [setFormData]);

  useEffect(() => {
    localStorage.setItem("magForm", JSON.stringify(magFormState));
  });

  // Button functions
  const step1done = () => {
    magFormInputHandler(arrKeys[0], "filled", true);
  };

  const step2done = () => {
    magFormInputHandler(arrKeys[1], "filled", true);
  };

  const step3done = () => {
    magFormInputHandler(arrKeys[2], 0, true);
    setShortCircuit(false);
  };

  const step3short = () => {
    magFormInputHandler(arrKeys[2], 1, false);
    setShortCircuit(true);
  };

  const step4done = () => {
    magFormInputHandler(arrKeys[3], 0, true);
    setShortCircuit(false);
  };

  const step4short = () => {
    magFormInputHandler(arrKeys[4], 1, false);
    setShortCircuit(true);
  };

  const reset = () => {
    for (let i = 0; i < numSteps; i++) {
      magFormInputHandler(arrKeys[i], "", false);
    }
    setShortCircuit(false);
  };

  // End button function

  return (
    <React.Fragment>
      <Card>
        <h3>{[arrKeys[0]]}</h3>
        <p>
          a. To begin the process, you have to file and serve a Writ of Summons,
          along with a statement of claim.
        </p>
        <p>
          b. A writ of summons commences the action, and must be in Form 2 of
          the Rules of Court. An empty copy is available{" "}
          <a
            href="https://www.supremecourt.gov.sg/docs/default-source/default-document-library/civil-proceedings/writ-of-summons.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          {". "}Do fill in the blank spaces with the relevant details.
        </p>
        <p>
          c. A statement of claim sets out the relevant facts establishing your
          claim. This may be endorsed on the writ and served together with it.
        </p>
        <p>
          d. Filing a document means that you are submitting it to the Court.
          Filings have to be done at the{" "}
          <a href="https://www.google.com/maps?ll=1.285234,103.844725&z=15&t=m&hl=en-SG&gl=US&mapclient=embed&q=1%C2%B017%2706.8%22N+103%C2%B050%2741.0%22E+1.285234,+103.844725@1.285234,103.844725">
            CrimsonLogic Service Bureau - Chinatown Point
          </a>
        </p>
        <Button type="button" inverse onClick={step1done}>
          Done
        </Button>
      </Card>
      {magFormState.inputs[arrKeys[0]].isValid && (
        <Card>
          <h3>{[arrKeys[1]]}</h3>
          <p>
            You must serve the Writ of Summons and statement of claim to the
            defendant through a process server.
          </p>
          <p>
            You may make an appointment for service of the Writ by filling up a
            "Request for Process Server" form at the{" "}
            <a
              href="https://www.google.com/maps/place/State+Courts/@1.2869134,103.842924,15z/data=!4m2!3m1!1s0x0:0xdfd55f08c1512bb3?sa=X&ved=2ahUKEwiLzN2NpOPnAhXrxDgGHQGcD_QQ_BIwEnoECB4QCA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Central Registry
            </a>
            {" "}(State Courts Towers on Level 2). If the Defendant is an
            individual, the Writ must be directly served on him/her.
          </p>
          <p>
            *Note down the date which the defendant receives the Writ as it will
            impact the following steps.
          </p>
          <Button type="button" inverse onClick={step2done}>
            Done
          </Button>
        </Card>
      )}
      {magFormState.inputs[arrKeys[1]].isValid && (
        <Card>
          <h3>{[arrKeys[2]]}</h3>
          <p>
            A Memorandum of Appearance states the defendant’s intention to
            appear in court and challenge the claim.
          </p>
          <Button type="button" inverse onClick={step3done}>
            Yes
          </Button>
          <Button type="button" inverse onClick={step3short}>
            No
          </Button>
        </Card>
      )}
      {magFormState.inputs[arrKeys[2]].isValid && (
        <Card>
          <h3>{[arrKeys[3]]}</h3>
          <Button type="button" inverse onClick={step4done}>
            Yes
          </Button>
          <Button type="button" inverse onClick={step4short}>
            No
          </Button>
        </Card>
      )}
      {magFormState.inputs[arrKeys[3]].isValid && !shortCircuit && (
        <Card>
          <h3>Replying to the defendant and defence to the counterclaim</h3>
          <Accordion allowZeroExpanded="true">
            <Questions
              faq={{
                question: "Reply to the defendant",
                answer:
                  "The reply to the defendant is your optional opportunity to respond to any points made in the defence which were not dealt with in youroriginal claim."
              }}
            />
            <Questions
              faq={{
                question: "Defence to the counterclaim",
                answer:
                  "The defence to the counterclaim is your opportunity to respond to the counterclaim made by the defendant, wherein he/she alleges that they have a claim, or are entitled to relief, against you."
              }}
            />
          </Accordion>
          <p>
            You can choose to file and serve a Reply and Defence to
            Counterclaim, or just a Defence to Counterclaim if there is no
            Reply. This must be done within 14 days of you being served with the
            defence and counterclaim by the defendant.
          </p>
          <p>
            Pleadings will be deemed closed 14 days after service of the reply
            or service of the defence to the counterclaim.
          </p>
          <p>
            If you choose not to reply and/or file a defence to the
            counterclaim, the pleadings will close 14 days after the defence is
            served.
          </p>
          <Button type="button" inverse onClick={reset}>
            Restart
          </Button>
        </Card>
      )}
      {shortCircuit && (
        <Card>
          <h3>
            You may apply to the Court for judgement to be entered against the
            defendent
          </h3>
          <Button type="button" inverse onClick={reset}>
            Restart
          </Button>
        </Card>
      )}
    </React.Fragment>
  );

  //   return <h1> This is from Magistrates Court</h1>;
}

export default MagistratesCourts;
