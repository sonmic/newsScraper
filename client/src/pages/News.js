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

  render() {
    return (
      <div>
        {this.state.news.length ? (
          <div class="cardContainer">
            {this.state.news.map(news => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </div>
    );
  }
}

export default News;
