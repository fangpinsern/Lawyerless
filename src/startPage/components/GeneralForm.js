import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";

// Props include:
// formFieldID
// validators
// nextStep
// prevStep
// inputType
// label
// errorText

function GeneralForm(props) {
  const formData = props.formData;
  const nextStepHandler = props.nextStep;
  const prevStepHandler = props.prevStep;
  const formDataInputHandler = props.formDataInputHandler;

  const dateUpdated = event => {
    event.preventDefault();
    nextStepHandler();
  };

  return (
    <Card>
      <form className="contact-form">
        <Input
          id={props.formFieldId}
          element={props.inputType}
          type="text"
          label={props.label}
          validators={props.validators}
          errorText={props.errorText}
          onInput={formDataInputHandler}
        />
        <Button type="button" inverse onClick={prevStepHandler}>
          Previous Step
        </Button>
        <Button
          type="button"
          inverse
          onClick={dateUpdated}
          disabled={!formData.inputs.dateOfIncident.isValid}
        >
          Next Step
        </Button>
      </form>
    </Card>
  );
}

export default GeneralForm;
