import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";

function ActualForm1(props) {
  const formData = props.formData;
  const nextStepHandler = props.nextStep;
  const prevStepHandler = props.prevStep;
  const setFromData = props.setFromData;

  const dateUpdated = event => {
    event.preventDefault();
    setFromData({
      ...formData,
      dateOfIncident: event.target.value
    });
    console.log(props.formType);
    nextStepHandler();
  };
  return (
    <Card>
      <form className="contact-form">
        <label>Date</label>
        <input id="date" type="text" />
        <Button type="button" inverse onClick={dateUpdated}>
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
