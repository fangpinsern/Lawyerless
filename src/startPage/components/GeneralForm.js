import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";

// Props include:
// key - to prevent stateful components reuse
// formFieldID - which form field is being filled
// validators - array of different validators to see if the input is valid
// nextStep - next step in the form
// prevStep - previous step in the form
// inputType - type of input
// label - label
// errorText - text appears when validators fail
// placeholder - placeholder when there is no input from the user

function GeneralForm(props) {
  const formData = props.formData;
  const nextStepHandler = props.nextStep;
  const prevStepHandler = props.prevStep;
  const formDataInputHandler = props.formDataInputHandler;
  const formFieldId = props.formFieldId;
  const inputType = props.inputType;
  const label = props.label;
  const validators = props.validators;
  const errorText = props.errorText;
  const placeholder = props.placeholder;

  const formUpdated = event => {
    event.preventDefault();
    nextStepHandler();
  };

  return (
    <Card>
      <form className="contact-form">
        <Input
          id={formFieldId}
          element={inputType}
          type="text"
          label={label}
          validators={validators}
          errorText={errorText}
          onInput={formDataInputHandler}
          placeholder={placeholder}
        />
        <Button type="button" inverse onClick={prevStepHandler}>
          Previous Step
        </Button>
        <Button
          type="button"
          inverse
          onClick={formUpdated}
          disabled={!formData.inputs[formFieldId].isValid}
        >
          Next Step
        </Button>
      </form>
    </Card>
  );
}

export default GeneralForm;
