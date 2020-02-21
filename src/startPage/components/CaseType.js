import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";

import "./CaseType.css";

// nextStep - next step in the form
// prevStep - previous step in the form
// setFormType - function to set the type of form
// formType - type of form
// optionsAvailable - Array of strings that define the options

function CaseType(props) {
  const nextStepHandler = props.nextStep;
  const prevStepHandler = props.prevStep;
  const setForm = props.setFormType;
  const optionsAvailable = props.optionsAvailable;

  // Selector for type of case
  const [currentValue, setCurrentValue] = useState(optionsAvailable[0]);
  const changeHandler = event => {
    setCurrentValue(event.target.value);
    setForm(event.target.value);
  };
  // End Selector for type of case

  // Next Step Handlers
  const chosenForm = event => {
    event.preventDefault();
    setForm(currentValue);
    nextStepHandler();
  };
  // End Next Step Handlers


  return (
    <Card>
      <form className="contact-form" id="contact-dropdown-form">
      <h2>{props.label}</h2>
        <select
          id="case-types"
          name="typelist"
          value={currentValue}
          onChange={changeHandler}
        >
          {optionsAvailable.map((option, i) => {
            return (
              <option className="dropdown_option" value={option} key={i}>
                {option}
              </option>
            );
          })}
        </select>
        {prevStepHandler && (
          <Button type="button" inverse onClick={prevStepHandler}>
            Previous Step
          </Button>
        )}
        {nextStepHandler && (
          <Button type="button" inverse onClick={chosenForm}>
            Next Step
          </Button>
        )}
      </form>
    </Card >
  );
}

export default CaseType;
