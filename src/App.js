import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Resources from "./resources/pages/Resources";
import Faq from "./faq/pages/Faq";
import AboutUs from "./aboutus/pages/AboutUs";
import HomePage from "./homePage/pages/HomePage";
import { ProgressContext } from "./shared/context/progressBar-context";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import StartPage from "./startPage/pages/StartPage";

function App() {
  return (
    <ProgressContext.Provider value={{ completed: 0 }}>
      <Router>
        <MainNavigation />

        <main>
          <ProgressBar animated now={45} />
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
