const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapedDataSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  pic: { type: String, required: true },
  summary: { type: String, required: true },
  pubdate: { type: String, required: true },
  favorited: { type: Boolean, required: true }
});

const scrapedData = mongoose.model("scrapedData", scrapedDataSchema);

module.exports = scrapedData;
