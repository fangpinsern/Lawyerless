import React, { useState } from "react";
import { useForm } from "../../shared/hooks/form-hooks";

import Card from "../../shared/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

function RespondingContest() {
  const respondingForm = {
    "File Memorandum of Appearance": {
      value: "",
      output: "",
      isValid: false
    },
    "File Defence and Counterclaim": {
      value: "",
      output:
        "After you file a memorandum of appearance, you are to serve a defense within the time limit, or judgement in default of appearance may still apply",
      isValid: false
    },

    "Has the plaintiff replied to your defence?": {
      value: "",
      output: "",
      isValid: false
    }
  };

  const arrKeys = Object.keys(respondingForm);
  const numSteps = arrKeys.length;

  const [
    respondingFormState,
    respondingformInputHandler,
    setFormData
  ] = useForm(respondingForm, false);

  const [skipToSixState, setSkipToSix] = useState(false);

  const step1done = () => {
    respondingformInputHandler(arrKeys[0], "done", true);
    setSkipToSix(false);
  };

  const skipToSix = () => {
    setSkipToSix(true);
  };

  const step2done = () => {
    respondingformInputHandler(arrKeys[1], "done", true);
    setSkipToSix(false);
  };

  const step3done = () => {
    respondingformInputHandler(arrKeys[2], "done", true);
    setSkipToSix(false);
  };

  const step4yes = () => {
    respondingformInputHandler(arrKeys[2], "yes", true);
    setSkipToSix(false);
  };

  const step4no = () => {
    respondingformInputHandler(arrKeys[2], "no", true);
    setSkipToSix(false);
  };

  const restart = () => {
    for (let i = 0; i < numSteps; i++) {
      respondingformInputHandler(arrKeys[i], "", false);
    }
    setSkipToSix(false);
  }

  const inputValues = respondingFormState.inputs;
  return (
    <React.Fragment>
      <Card>
        <h3>{arrKeys[0]}</h3>
        <p>{inputValues[arrKeys[0]].output}</p>
        <Button type="button" inverse onClick={step1done}>
          Done
        </Button>
        <Button type="button" inverse onClick={skipToSix}>
          I have missed the deadline!
        </Button>
      </Card>
      {inputValues[arrKeys[0]].isValid && (
        <Card>
          <h3>{arrKeys[1]}</h3>
          <p>{inputValues[arrKeys[1]].output}</p>
          <Button type="button" inverse onClick={step2done}>
            Done
          </Button>
          <Button type="button" inverse onClick={skipToSix}>
            I have missed the deadline!
          </Button>
        </Card>
      )}

      {inputValues[arrKeys[1]].isValid && (
        <Card>
          <h3>Has the plaintiff replied to your Defence?</h3>
          <Button type="button" inverse onClick={step4yes}>
            Yes
          </Button>
          <Button type="button" inverse onClick={step4no}>
            No
          </Button>
        </Card>
      )}

      {inputValues[arrKeys[2]].value === "yes" && (
        <Card>
          <p>
            Pleadings will be deemed closed 14 days after service of the reply
            or service of the defence to the counterclaim by the plaintiff to
            you.
          </p>
          <Button type="button" inverse onClick={restart}>
            Restart
          </Button>
        </Card>
      )}

      {inputValues[arrKeys[2]].value === "no" && (
        <Card>
          <p>The pleadings will close 14 days after the defence is served.</p>
          <Button type="button" inverse onClick={restart}>
            Restart
          </Button>
        </Card>
      )}

      {skipToSixState && (
        <Card>
          <h3>Setting aside an order made in your absence</h3>
          <p>
            Login to CJTS and complete the e-service "Set Aside Application"
            under "Online Applications". A date and time will be scheduled by
            the registry for both parties to attend accordingly at the
            Tribunals.
          </p>
          <p>
            The application must be made within 1 month after the date on which
            the order was made.
          </p>
          <p>
            Print a copy of the "Notice of Hearing to set-aside" document online
            and attend at the Tribunals on the stated date and time. If you are
            absent for the Hearing of the application, the application may be
            dismissed and you may be precluded from filing any further set aside
            applications.
          </p>
          <p>
            Source:
            https://www.statecourts.gov.sg/cws/SmallClaims/Pages/Setting-aside-an-Order-made-in-your-absence.aspx
          </p>
          <Button type="button" inverse onClick={restart}>
            Restart
          </Button>
        </Card>
      )}
    </React.Fragment>
  );
  // return <h1>This is from Responding to Contest</h1>
}

export default RespondingContest;
