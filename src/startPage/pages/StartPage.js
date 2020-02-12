import React, { useContext, useState } from "react";

// Imports from local components
import { ProgressContext } from "../../shared/context/progressBar-context";
import CaseType from "../components/CaseType";
import ActualForm1 from "../components/ActualForm1";
import ActualForm2 from "../components/ActualForm2";

// Imports for styling
import "./StartPage.css";
import Button from "../../shared/components/FormElements/Button";

function StartPage() {
  // Progress bar context
  const progress = useContext(ProgressContext);
  const nextStepHandler = () => {
    progress.increase();
  };
  const previousStepHandler = () => {
    progress.decrease();
  };
  // End progress bar context

  // Form for property damage and personal injury
  const [committingForm, setCommitingFrom] = useState({
    numSteps: 3,
    dateOfIncident: "",
    valueOfClaim: 0
  });

  // Check which from is being used
  const [formType, setFormType] = useState("");

  if (formType === "physicalHarm") {
    progress.updateNumSteps(committingForm.numSteps);
  } else {
    progress.updateNumSteps(5);
  }
  // End Check which from is being used

  // Progress of the user
  const step = progress.completed;

  // At different steps, different parts of the form will render
  switch (step) {
    case 0:
      return (
        <CaseType
          nextStep={nextStepHandler}
          setFormType={setFormType}
          formtype={formType}
        />
      );
    case 1:
      return (
        <ActualForm1
          nextStep={nextStepHandler}
          prevStep={previousStepHandler}
          formData={committingForm}
          setFromData={setCommitingFrom}
        />
      );
    case 2:
      return (
        <ActualForm2
          nextStep={nextStepHandler}
          prevStep={previousStepHandler}
          formData={committingForm}
          setFromData={setCommitingFrom}
        />
      );
    default:
      return (
        <React.Fragment>
          <h1>
            Something bad happened. Please try again {formType} {step}{" "}
          </h1>
          <Button type="button" inverse onClick={previousStepHandler}>
            Previous Step
          </Button>
        </React.Fragment>
      );
  }
  // return (
  //   <Card>
  //     <form className="contact-form">
  //       <select id="case-types" name="typelist">
  //         <option value="physical-harm">PHYSICAL HARM</option>
  //         <option value="property-damage">PROPERTY DAMAGE</option>
  //       </select>
  //       <Button
  //         type="button"
  //         disabled={progress.completed >= 100}
  //         inverse
  //         onClick={nextStepHandler}
  //       >
  //         Next Step
  //       </Button>
  //       <Button
  //         type="button"
  //         disabled={progress.completed <= 0}
  //         inverse
  //         onClick={previousStepHandler}
  //       >
  //         Previous Step
  //       </Button>
  //     </form>
  //   </Card>
  // );
}

export default StartPage;
