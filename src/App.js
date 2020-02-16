import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

// Imports from local components
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Resources from "./resources/pages/Resources";
import Faq from "./faq/pages/Faq";
import AboutUs from "./aboutus/pages/AboutUs";
import HomePage from "./homePage/pages/HomePage";
import StartPage from "./startPage/pages/StartPage";
import { ProgressContext } from "./shared/context/progressBar-context";

// Imports for styling
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  // Context for progress bar percentage
  const [numSteps, setNumSteps] = useState(5);
  const percentagePerStep = 100 / numSteps;
  const [completedRate, setCompletedRate] = useState(0);

  const increase = useCallback(() => {
    if (completedRate < numSteps) {
      setCompletedRate(completedRate + 1);
    }
  }, [completedRate, numSteps]);

  const decrease = useCallback(() => {
    setCompletedRate(completedRate - 1);
  }, [completedRate]);

  const updateNumSteps = useCallback(numSteps => {
    setNumSteps(numSteps);
  }, []);

  const reset = useCallback(() => {
    setCompletedRate(0);
  }, []);
  // End context for progress bar percentage

  // Local Storage
  useEffect(() => {
    const data = localStorage.getItem("completed-rate");
    if (data) {
      setCompletedRate(JSON.parse(data));
    }
  }, [setCompletedRate]);

  useEffect(() => {
    localStorage.setItem("completed-rate", JSON.stringify(completedRate));
  });
  // End Local Storage

  return (
    <ProgressContext.Provider
      value={{
        completed: completedRate,
        numSteps: numSteps,
        updateNumSteps: updateNumSteps,
        increase: increase,
        decrease: decrease,
        reset: reset
      }}
    >
      <Router>
        <MainNavigation />

        <main>
          <Link to="/start">
            <ProgressBar
              animated
              variant="success"
              now={completedRate * percentagePerStep}
            />
          </Link>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/aboutus" exact>
              <AboutUs />
            </Route>
            <Route path="/start" exact>
              <StartPage />
            </Route>
            <Route path="/faq" exact>
              <Faq />
            </Route>
            <Route path="/resources" exact>
              <Resources />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </ProgressContext.Provider>
  );
}

export default App;
