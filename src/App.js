import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListView from './views/ListView';
import DetailsView from './views/DetailsView';
import Addediview from './views/Addediview';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ListView} />
        <Route path="/task/:id" component={DetailsView} />
        <Route path="/add" component={Addediview} />
        <Route path="/edit/:id" component={Addediview} />
      </Switch>
    </Router>
  );
}

export default App;
