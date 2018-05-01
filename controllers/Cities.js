const { Cities, Users } = require("../models");

module.exports = {
  create: (req, res) => {
    if (!req.user) {
      res.status(401).json({ message: "NOT LOGGED IN" });
      return;
    }
    Cities.create(req.body)
      .then(city =>
        Users.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { cities: city._id } }
        )
          .then(user => res.json(user))
          .catch(err => res.status(422).json(err.errmsg))
      )
      .catch(err => res.status(422).json(err.errmsg));
  }
};
