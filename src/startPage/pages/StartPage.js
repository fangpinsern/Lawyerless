import React, { useContext } from "react";

import "./StartPage.css";
import { ProgressContext } from "../../shared/context/progressBar-context";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";

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
    </Card>
  );
}

export default StartPage;
