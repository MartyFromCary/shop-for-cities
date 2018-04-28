const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    population: { type: Number, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notes"
      }
    ]
  },
  { timestamps: true }
);

const Cities = mongoose.model("Cities", userSchema, "cities");

module.exports = Cities;
