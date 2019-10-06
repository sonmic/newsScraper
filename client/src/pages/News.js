import React, { Component } from "react";
import NewsCard from "../components/NewsCard";
import { Container } from "@material-ui/core";

export default function News({ favoriteOnly, news, deleteNews, setFavorite }) {
  return (
    <Container>
      {news.length ? (
        <div className="cardContainer">
          {news
            .filter(newsItem => (favoriteOnly ? newsItem.favorited : true))
            .map(newsItem => (
              <NewsCard
                key={newsItem._id}
                news={newsItem}
                onDelete={deleteNews}
                onSetFavorite={setFavorite}
              />
            ))}
        </div>
      ) : (
        <h3>No Results to Display</h3>
      )}
    </Container>
  );
}
