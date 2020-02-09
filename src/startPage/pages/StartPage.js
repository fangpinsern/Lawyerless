import React, { useContext } from "react";

// Imports from local components
import { ProgressContext } from "../../shared/context/progressBar-context";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";

// Imports for styling
import "./StartPage.css";

function StartPage() {
  const progress = useContext(ProgressContext);
  const nextStepHandler = event => {
    event.preventDefault();
    progress.increase();
  };
  const previousStepHandler = event => {
    event.preventDefault();
    progress.decrease();
  };

  return (
    <Card>
      <form className="contact-form">
        <select id="case-types" name="typelist">
          <option value="physical-harm">PHYSICAL HARM</option>
          <option value="property-damage">PROPERTY DAMAGE</option>
        </select>
        <Button
          type="button"
          disabled={progress.completed >= 100}
          inverse
          onClick={nextStepHandler}
        >
          Next Step
        </Button>
        <Button
          type="button"
          disabled={progress.completed <= 0}
          inverse
          onClick={previousStepHandler}
        >
          Previous Step
        </Button>
      </form>
    </Card>
  );
}

export default StartPage;
