import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Resources from './resources/pages/Resources';
import Faq from './faq/pages/Faq';
import AboutUs from './aboutus/pages/AboutUs';
import HomePage from './homePage/pages/HomePage';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/aboutus" exact>
            <AboutUs />
          </Route>
          <Route path="/start" exact>
          
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
  );
}

export default App;
