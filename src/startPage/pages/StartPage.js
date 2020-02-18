import React, { useContext, useState } from "react";

// Imports from local components
import { ProgressContext } from "../../shared/context/progressBar-context";
import CaseType from "../components/CaseType";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_DATE,
  VALIDATOR_NUMBER
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

<<<<<<< Updated upstream
  // Form for property damage and personal injury
  const [committingFormState, committingFormInputHandler] = useForm(
    {
      numSteps: 4,
      dateOfIncident: {
        value: "",
        isValid: false
=======
  // General Form Type
  // inputs -> {input -> value, type, isValid}
  // after the first selector, narrow the form type. the switch statement
  // should by dynamic

  const formStorage = {
    "Commencing An Action": {
      "Property Damage": {
        dateOfIncident: {
          value: "",
          validators: [VALIDATOR_REQUIRE(), VALIDATOR_DATE()],
          type: "input",
          output:
            "If the incident is within 6 years, you are still within the time limit to sue. Unfortunately, if it has been more than 6 years, the time limit for commencing an action for property damage has passed.",
          placeholder: "DD/MM/YYYY",
          label: "Date",
          errorText: "Please enter a valid date and format (DD/MM/YYYY).",
          isValid: false
        },
        valueOfClaim: {
          value: 0,
          validators: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
          type: "input",
          output:
            "Information on how to calculate value of claim for personal injury",
          placeholder: "Value of claim",
          label: "Value of claim",
          errorText: "Please enter a valid value",
          isValid: false
        },
        end: {
          type: "output",
          output: "",
          endFunction: (dateOfIncident, valueOfClaim) => {
            // If dateOfIncident within 6 years, can sue - show procedures to suing
            // Process dependent on value you are suing for
            let output = "";
            const sixYearAgo = moment().subtract(6, "years").format("DD/MM/YYYY");
            const sixYearsHavePassed = moment(sixYearAgo).isAfter(dateOfIncident);
            console.log(sixYearAgo);
            console.log(sixYearsHavePassed);
            if (sixYearsHavePassed) {
              output = "Unfortunately, the time limit for commencing an action for property damage has passed. "
            } else {
              const x = parseInt(valueOfClaim);
              switch (true) {
                case (x < 20000):
                  output = output + "Your Claim needs to be filed in the Small Claims Tribunal.";
                  break;
                case (x < 30000):
                  output = output + "If you and the Respondent both agree, this claim can be filed in the Small Claims Tribunal. Otherwise, then it needs to be filed in the Magistrate's Court."
                  break;
                case (x < 60000):
                  output = output + "Your claim needs to be filed in the Magistrate's Court.";
                  break;
                default:
                  output = output + "Your claim needs to be filed in either the District Court or the Hight Court based on the value of your claim. You ought to consult a lawyer for advice."
              }

              return output;
            }

          }
        }
>>>>>>> Stashed changes
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
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
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
