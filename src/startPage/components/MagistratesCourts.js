import React, { useState, useEffect } from "react";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hooks";

//

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
    "Has the respondent filed the Memorandum of Appearance within 8 days of receiving the Writ?": {
      value: "",
      isValid: false
    },
    "Has the respondent filed a Defence/Counterclaim?": {
      value: "",
      isValid: false
    }
  };

  // Whether next appears depends on previous value
  const arrKeys = Object.keys(MagForm);
  const numSteps = arrKeys.length;

  const [magFormState, magFormInputHandler, setFormData] = useForm(MagForm, false);

  const [shortCircuit, setShortCircuit] = useState(false);
  
  useEffect(() => {
    const data = localStorage.getItem("magForm");
    if(data) {
      const parseData = JSON.parse(data);
      setFormData(parseData.inputs, parseData.isValid);
    }
  }, [setFormData])

  useEffect(() => {
    localStorage.setItem("magForm", JSON.stringify(magFormState));
    console.log("i am here");
  })

  // Button functions
  const step1done = () => {
    magFormInputHandler("Filing of the Summons", "filled", true);
  };

  const step2done = () => {
    magFormInputHandler("Servicing of the Writ", "filled", true);
  };

  const step3done = () => {
    magFormInputHandler(
      "Has the respondent filed the Memorandum of Appearance within 8 days of receiving the Writ?",
      0,
      true
    );
    setShortCircuit(false);
  };

  const step3short = () => {
    magFormInputHandler(
      "Has the respondent filed the Memorandum of Appearance within 8 days of receiving the Writ?",
      1,
      false
    );
    setShortCircuit(true);
  };

  const step4done = () => {
    magFormInputHandler(
      "Has the respondent filed a Defence/Counterclaim?",
      0,
      true
    );
    setShortCircuit(false);
  };

  const step4short = () => {
    magFormInputHandler(
      "Has the respondent filed a Defence/Counterclaim?",
      1,
      false
    );
    setShortCircuit(true);
  };

  const reset = () => {
    for(let i = 0; i < numSteps; i++) {
        magFormInputHandler(arrKeys[i], "", false);
    }
    setShortCircuit(false);
  }

  // End button function

  return (
    <React.Fragment>
      <Card>
        <h3>{[arrKeys[0]]}</h3>
        <p>
          Writ of Summons (dispute on the facts) → link to Writ: A writ must be
          in Form 2 of the Rules of Court, which can be downloaded:
          https://www.supremecourt.gov.sg/docs/default-source/default-document-library/civil-proceedings/writ-of-summons.pdf
          | Originating Summons (disputes on the law) → suggest they get a
          lawyer
        </p>
        <Button type="button" inverse onClick={step1done}>
          Done
        </Button>
      </Card>
      {magFormState.inputs[arrKeys[0]].isValid && (
        <Card>
          <h3>{[arrKeys[1]]}</h3>
          <p>Note the date which the defendant receives the Writ</p>
          <Button type="button" inverse onClick={step2done}>
            Done
          </Button>
        </Card>
      )}
      {magFormState.inputs[arrKeys[1]].isValid && (
        <Card>
          <h3>{[arrKeys[2]]}</h3>
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
      {shortCircuit && (
        <Card>
          <h3>You may apply to the Court for judgement to be entered against the defendent</h3>
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
