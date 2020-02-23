/* eslint no-eval: 0 */
import React, { useContext, useState, useEffect } from "react";

// Imports from local components
import { ProgressContext } from "../../shared/context/progressBar-context";
import CaseType from "../components/CaseType";
import { EndFunctions } from "../data/EndFunctions"
// Imports for styling
import "./StartPage.css";
import { useForm } from "../../shared/hooks/form-hooks";
import GeneralForm from "../components/GeneralForm";

import formStorage from "../data/FormStorage";

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
    localStorage.removeItem("magForm");
  };
  // End progress bar context

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

  // Local Storage
  useEffect(() => {
    const data = localStorage.getItem("committing-form-inputs");
    const isValid = localStorage.getItem("committing-form-isValid") === "true";
    const compressedFunc = localStorage.getItem(
      "committing-form-inputs-endFunction"
    );

    if (data) {
      const parseData = JSON.parse(data);
      parseData.end.endFunction = compressedFunc ;
      setFormData(parseData, isValid);
    }
  }, [setFormData]);

  useEffect(() => {
    localStorage.setItem(
      "committing-form-inputs",
      JSON.stringify(committingFormState.inputs)
    );
    localStorage.setItem(
      "committing-form-isValid",
      JSON.stringify(committingFormState.isValid)
    );
    localStorage.setItem(
      "committing-form-inputs-endFunction",
      committingFormState.inputs.end.endFunction.toString()
    );
    // console.log("i am here")
  });
  // End Local Storage

  const actionOrReaction =
    actionType === arrayOfAction[0]
      ? "What would you like to take action for?"
      : "Would you like to contest the claim?";

  const arrayOfInputs = Object.keys(committingFormState.inputs);

  const arrayOfInputsReturned = arrayOfInputs.map((input, i) => {
    return (
      <GeneralForm
        key={i}
        formFieldId={input}
        validators={committingFormState.inputs[input].validators}
        type={committingFormState.inputs[input].type}
        output={committingFormState.inputs[input].output}
        outputFunction={EndFunctions(committingFormState.inputs[input].endFunction)}
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

  progress.updateNumSteps(arrayOfInputs.length + 1);

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
          label="What would you like to do?"
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
          label={actionOrReaction}
        />
      );
    default:
      return arrayOfInputsReturned[step - 2];
  }
}

export default StartPage;
