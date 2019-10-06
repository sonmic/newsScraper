import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { List, ListItem } from "../components/List";
import NewsCard from "../components/NewsCard";
import { Container } from "@material-ui/core";

class News extends Component {
  state = {
    news: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadNews();
  }

  loadNews = () => {
    API.getNews()
      .then(res =>
        this.setState({ news: res.data, title: "", author: "", synopsis: "" })
      )
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
    const { favoriteOnly } = this.props;
    return (
      <Container>
        {this.state.news.length ? (
          <div className="cardContainer">
            {this.state.news
              .filter(news => (favoriteOnly ? news.favorited : true))
              .map(news => (
                <NewsCard
                  key={news._id}
                  news={news}
                  onDelete={this.deleteNews}
                  onSetFavorite={this.setFavorite}
                />
              ))}
          </div>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </Container>
    );
  }
}

export default News;
