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
  const resetHandler = () => {
    progress.reset();
  };
  // End progress bar context

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
            "The value of the claim should depend on the value of the damaged property",
          placeholder: "Value of claim",
          label: "Value of claim",
          errorText: "Please enter a valid value",
          isValid: false
        },
        end: {
          type: "output",
          output: ""
        }
      },
      "Personal Injury": {
        dateOfIncident: {
          value: "",
          validators: [VALIDATOR_REQUIRE(), VALIDATOR_DATE()],
          type: "input",
          output:
            "If the incident is within 3 years, you are still within the time limit to sue. Unfortunately, if it has been more than 3 years, the time limit for commencing an action for personal injury has passed.",
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
            "Contain information on how to calculate value of claim for personal injury",
          placeholder: "Value of claim",
          label: "Value of claim",
          errorText: "Please enter a valid value",
          isValid: false
        }
      }
    },
    "Responding To An Action": {
      "Contest Claim": {},
      "Do Not Contest Claim": {}
    }
  };

  // Action types
  const arrayOfAction = Object.keys(formStorage);

  // Check which action
  const [actionType, setActionType] = useState(arrayOfAction[0]);
  // End Check which action

  // Form types
  const arrayOfForms = Object.keys(formStorage[actionType]);

  // Check which from is being used
  const [formType, setFormType] = useState(arrayOfForms[0]);
  // End Check which from is being used

  // Choose which form to use from form storage
  const chosenForm = formStorage[actionType][formType];

  const [
    committingFormState,
    committingFormInputHandler,
    setFormData
  ] = useForm(chosenForm, false);

  const setFormTypeWrapper = value => {
    setFormData(formStorage[actionType][value], false);
    setFormType(value);
  };
  // End choose which form to use from form storage

  const arrayOfInputs = Object.keys(committingFormState.inputs);

  const arrayOfInputsReturned = arrayOfInputs.map((input, i) => {
    return (
      <GeneralForm
        key={i}
        formFieldId={input}
        validators={committingFormState.inputs[input].validators}
        type={committingFormState.inputs[input].type}
        output={committingFormState.inputs[input].output}
        nextStep={nextStepHandler}
        prevStep={previousStepHandler}
        reset={resetHandler}
        formData={committingFormState}
        formDataInputHandler={committingFormInputHandler}
        label={committingFormState.inputs[input].label}
        errorText={committingFormState.inputs[input].errorText}
        inputType="input"
        placeholder={committingFormState.inputs[input].placeholder}
      />
    );
  });

  progress.updateNumSteps(arrayOfInputs.length + 2);

  // Progress of the user
  const step = progress.completed;

  // At different steps, different parts of the form will render
  switch (step) {
    case 0:
      return (
        <CaseType
          key={0}
          nextStep={nextStepHandler}
          setFormType={setActionType}
          formtype={actionType}
          optionsAvailable={arrayOfAction}
        />
      );
    case 1:
      return (
        <CaseType
          key={1}
          nextStep={nextStepHandler}
          prevStep={previousStepHandler}
          setFormType={setFormTypeWrapper}
          formtype={formType}
          optionsAvailable={arrayOfForms}
        />
      );
    default:
      return arrayOfInputsReturned[step - 2];
  }
}

export default StartPage;
