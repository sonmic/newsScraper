// Dependencies
var express = require("express");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
const router = express.Router();
const db = require("../../models");
const url = require("url");

// Main route (simple Hello World Message)
router.route("/").get(function(req, res) {
  res.send("Hello world");
});

// Retrieve data from the db
router.route("/all").get(function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData
    .find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.delete("/news/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.scrapedData
    .remove({ _id: req.params.id })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.put("/news/:id", function(req, res) {
  db.scrapedData
    .updateOne(
      { _id: req.params.id },
      { $set: { favorited: req.body.favorited } }
    )
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Scrape data from one site and place it into the mongodb db
router.route("/scrape").get(function(req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios
    .get("https://www.popularmechanics.com/technology/")
    .then(function(response) {
      // Load the html body from axios into cheerio
      var $ = cheerio.load(response.data);
      // For each element with a "title" class
      $("div.full-item").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        var pubdate = $(element)
          .find(".publish-date")
          .text()
          .trim();
        var title = $(element)
          .find(".full-item-title")
          .text()
          .trim();

        var link = url.resolve(
          "https://www.popularmechanics.com/technology/",
          $(element)
            .find(".full-item-content > a")
            .attr("href")
        );
        var pic = $(element)
          .find("img.lazyimage")
          .attr("data-src");

        var summary = $(element)
          .find(".full-item-dek")
          .text()
          .trim();

        // If this found element had both a title and a link
        if (title && link && pic && summary) {
          // Insert the data in the scrapedData db
          db.scrapedData
            .create({
              pubdate,
              title, //Same as title: title (ES6 Syntax) when the key/value names match
              summary,
              link,
              pic,
              favorited: false
            })
            .then(inserted => console.log(inserted))
            .catch(err => res.status(422).json(err));
        }
      });
    });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});

module.exports = router;
