import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import News from "./pages/News";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import NewsAppBar from "./components/NewsAppBar";
import API from "./utils/API";

export default class App extends React.Component {
  state = {
    news: [],
    favoriteOnly: false
  };

  componentDidMount() {
    this.loadNews();
  }

  refresh = () => {
    API.scrape().then(res => this.loadNews());
  };

  deleteAll = () => {
    API.deleteAll().then(res => this.loadNews());
  };

  loadNews = () => {
    API.getNews()
      .then(res => this.setState({ news: res.data }))
      .catch(err => console.log(err));
  };

  deleteNews = id => {
    API.deleteNews(id)
      .then(res => this.loadNews())
      .catch(err => console.log(err));
  };

  setFavorite = (id, favorited) => {
    API.setFavorite(id, favorited)
      .then(res => this.loadNews())
      .catch(err => console.log(err));
  };

  render() {
    const { news, favoriteOnly } = this.state;
    return (
      <Router>
        <div>
          <NewsAppBar
            favoriteOnly={favoriteOnly}
            setFavoriteOnly={value => this.setState({ favoriteOnly: value })}
            onRefresh={this.refresh}
            onDelete={this.deleteAll}
          />
          <Switch>
            <Route exact path="/">
              <News
                news={news}
                favoriteOnly={favoriteOnly}
                deleteNews={this.deleteNews}
                setFavorite={this.setFavorite}
              />
            </Route>
            <Route exact path="/news/:id" component={Detail} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
