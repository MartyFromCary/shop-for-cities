const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true }
});

module.exports = mongoose.model("Notes", noteSchema, "notes");
