import React, { useContext, useState } from "react";

import "./StartPage.css";
import { ProgressContext } from "../../shared/context/progressBar-context";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";


function StartPage() {
    
    const progress = useContext(ProgressContext);
    const [counter, setCounter] = useState(progress.completed);
    const nextStepHandler = event => {
        event.preventDefault();
        progress.increase();
        setCounter(counter + (100/progress.numSteps));
        console.log(counter);
    }
    const previousStepHandler = event => {
        event.preventDefault();
        progress.decrease();
        setCounter(counter - (100/progress.numSteps));
        console.log(counter);
    }
  return (<Card>
      <Button type="button" disabled={counter >= 100} inverse onClick={nextStepHandler}>Next Step</Button>
      <Button type="button" disabled={counter <=0} inverse onClick={previousStepHandler}>Previous Step</Button>
  </Card>);
  
}

export default StartPage;
