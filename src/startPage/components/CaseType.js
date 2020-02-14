import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";

import "./CaseType.css";

function CaseType(props) {
  // Selector for type of case
  const [currentValue, setCurrentValue] = useState("physicalHarm");
  const changeHandler = event => {
    setCurrentValue(event.target.value);
    console.log(event.target.value);
  };
  // End Selector for type of case

  // Next Step Handlers
  const nextStepHandler = props.nextStep;
  const setForm = props.setFormType;
  const chosenForm = event => {
    event.preventDefault();
    setForm(currentValue);
    nextStepHandler();
  };
  // End Next Step Handlers

  return (
    <Card>
      <form className="contact-form">
        <select
          id="case-types"
          name="typelist"
          value={currentValue}
          onChange={changeHandler}
        >
          <option value="physicalHarm">PHYSICAL HARM</option>
          <option value="propertyDamage">PROPERTY DAMAGE</option>
        </select>
        <Button type="button" inverse onClick={chosenForm}>
          Next Step
        </Button>
      </form>
    </Card>
  );
}

export default CaseType;
