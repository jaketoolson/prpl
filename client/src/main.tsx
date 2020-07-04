import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact path="/">
          Hello!
        </Route>
      </Switch>
    </Router>
  </div>,
  document.getElementById('app')
);
