import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";

// Props include:
// key - to prevent stateful components reuse
// type - either "input" or "output"
// output - text for output
// formFieldID - which form field is being filled
// validators - array of different validators to see if the input is valid
// nextStep - next step in the form
// prevStep - previous step in the form
// inputType - type of input
// label - label
// errorText - text appears when validators fail
// placeholder - placeholder when there is no input from the user
// outputFunction - The function the gives the output at the end

function GeneralForm(props) {
  const formData = props.formData;
  const nextStepHandler = props.nextStep;
  const prevStepHandler = props.prevStep;
  const resetHandler = props.reset;
  const formDataInputHandler = props.formDataInputHandler;
  const formFieldId = props.formFieldId;
  const inputType = props.inputType;
  const label = props.label;
  const validators = props.validators;
  const errorText = props.errorText;
  const placeholder = props.placeholder;
  const type = props.type;
  const output = props.output;
  const endFunction = props.outputFunction;

  // Array of key steps
  const arrayOfKeys = Object.keys(formData.inputs);
  arrayOfKeys.pop();

  const arrayOfValues = [];
  for (let i = 0; i < arrayOfKeys.length; i++) {
    arrayOfValues.push(formData.inputs[arrayOfKeys[i]].value);
  }

  const formUpdated = event => {
    event.preventDefault();
    nextStepHandler();
  };

  return (
    <React.Fragment>
      {type === "input" && (
        <Card>
          <form className="contact-form" id="contact-dropdown-form">
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
      )}
      {output && (
        <Card>
          <p>{output}</p>
        </Card>
      )}
      {endFunction && (
        <Card>
          {endFunction(...arrayOfValues)}
        </Card>
      )}
      {formFieldId === "end" && (
        <Button type="button" inverse onClick={resetHandler}>
          Restart Form
        </Button>
      )}
    </React.Fragment>
  );
}

export default GeneralForm;
