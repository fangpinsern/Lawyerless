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
    nextStepHandler();
  };

  return (
    <Card>
      <form className="contact-form">
      <Input
        id="valueOfClaim"
        element="input"
        type="text"
        label="Value Of Claim"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid value."
        onInput={formDataInputHandler}
      />
        <Button type="button" inverse onClick={dateUpdated} disabled={!formData.inputs.valueOfClaim.isValid}>
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
