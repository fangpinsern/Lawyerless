import React, { useContext, useState } from "react";

// Imports from local components
import { ProgressContext } from "../../shared/context/progressBar-context";
import CaseType from "../components/CaseType";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_DATE
} from "../../shared/util/validators";

// Imports for styling
import "./StartPage.css";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hooks";
import GeneralForm from "../components/GeneralForm";

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
  const [committingFormState, committingFormInputHandler] = useForm(
    {
      numSteps: 4,
      dateOfIncident: {
        value: "",
        isValid: false
      },
      valueOfClaim: {
        value: 0,
        isValid: false
      }
    },
    false
  );

  // Check which action
  const [actionType, setActionType] = useState("");

  // End Check which action

  // Check which from is being used
  const [formType, setFormType] = useState("");

  if (formType === "physicalHarm") {
    progress.updateNumSteps(committingFormState.inputs.numSteps);
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
          setFormType={setActionType}
          formtype={actionType}
          optionsAvailable={["Commiting an action", "Responding to an action"]}
        />
      );
    case 1:
      return (
        <CaseType
          nextStep={nextStepHandler}
          prevStep={previousStepHandler}
          setFormType={setFormType}
          formtype={formType}
          optionsAvailable={["Property Damage", "Personal Injury"]}
        />
      );
    case 2:
      return (
        <GeneralForm
          key={step}
          formFieldId="dateOfIncident"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_DATE()]}
          nextStep={nextStepHandler}
          prevStep={previousStepHandler}
          formData={committingFormState}
          formDataInputHandler={committingFormInputHandler}
          label="Date"
          errorText="Please enter a valid date and format (DD/MM/YYYY)."
          inputType="input"
          placeholder="DD/MM/YYYY"
        />
      );
    case 3:
      return (
        <GeneralForm
          key={step}
          formFieldId="valueOfClaim"
          validators={[VALIDATOR_REQUIRE()]}
          nextStep={nextStepHandler}
          prevStep={previousStepHandler}
          formData={committingFormState}
          formDataInputHandler={committingFormInputHandler}
          label="Value Of Claim"
          errorText="Please enter a valid value."
          inputType="input"
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
}

export default StartPage;
