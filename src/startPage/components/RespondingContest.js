import React from "react";
import { useForm } from "../../shared/hooks/form-hooks";

import Card from "../../shared/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

function RespondingContest() {
  const respondingForm = {
    "File Memorandum of Appearance": {
      value: "",
      isValid: false
    },
    "File Defence and Counterclaim": {
      value: "",
      output:
        "After you file a memorandum of appearance, you are to serve a defense within the time limit, or judgement in default of appearance may still apply",
      isValid: false
    },
    "Did you miss your deadline to file a memorandum of appearance?": {
      value: "",
      isValid: false
    },
    "Did you miss your deadline to file a defense/counterclaim?": {
      value: "",
      isValid: false
    },
    "Has the plaintiff replied to your defence?": {
      value: "",
      isValid: false
    }
  };

  const arrKeys = Object.keys(respondingForm);

  const [respondingFormState, respondingformInputHandler, setFormData] = useForm(respondingForm, false);
  
  const step1done = () => {
    respondingformInputHandler(arrKeys[0], "done", true);
  }

  const step2done = () => {
      respondingformInputHandler(arrKeys[1], "done", true);
  }

  const inputValues = respondingFormState.inputs;
  return <React.Fragment>
      <Card>
        <h3>{arrKeys[0]}</h3>
        <Button type="button" inverse onClick={step1done}>Done</Button>
      </Card>
      {inputValues[arrKeys[0]].isValid && <Card>
          <h3>{arrKeys[1]}</h3>
          <p>{inputValues[arrKeys[1]].output}</p>
          <Button type="button" inverse onClick={step2done}>Done</Button>
      </Card>}
  </React.Fragment>;
  // return <h1>This is from Responding to Contest</h1>
}

export default RespondingContest;
