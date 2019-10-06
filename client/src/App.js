import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import News from "./pages/News";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import NewsAppBar from "./components/NewsAppBar";

function App() {
  const [favoriteOnly, setFavoriteOnly] = useState(false);

  return (
    <Router>
      <div>
        <NewsAppBar
          favoriteOnly={favoriteOnly}
          setFavoriteOnly={setFavoriteOnly}
        />
        <Switch>
          <Route exact path="/">
            <News favoriteOnly={favoriteOnly} />
          </Route>
          <Route exact path="/news/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
