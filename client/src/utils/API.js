import axios from "axios";

export default {
  // Gets all news
  getNews: function() {
    return axios.get("/api/all");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/news/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/news/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/news", bookData);
  }
};
