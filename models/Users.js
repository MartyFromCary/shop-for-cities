const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, index: { unique: true } },
  password: { type: String, required: true },
  cities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cities"
    }
  ]
});

const Users = mongoose.model("Users", userSchema, "users");

module.exports = Users;
