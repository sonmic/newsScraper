import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import News from "./pages/News";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={News} />
          <Route exact path="/news" component={News} />
          <Route exact path="/news/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
