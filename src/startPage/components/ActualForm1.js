import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";

function ActualForm1(props) {
  const formData = props.formData;
  const nextStepHandler = props.nextStep;
  const prevStepHandler = props.prevStep;
  const formDataInputHandler = props.formDataInputHandler;

  const dateUpdated = event => {
    event.preventDefault();
    console.log(props.formType);
    nextStepHandler();
  };

  return (
    <Card>
      <form className="contact-form" id="contact-dropdown-form">
        <Input
          id="dateOfIncident"
          element="input"
          type="text"
          label="Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid date."
          onInput={formDataInputHandler}
        />
        <Button type="button" inverse onClick={dateUpdated} disabled={!formData.inputs.dateOfIncident.isValid}>
          Next Step
        </Button>
        <Button type="button" inverse onClick={prevStepHandler}>
          Previous Step
        </Button>
      </form>
    </Card>
  );
}

export default ActualForm1;
