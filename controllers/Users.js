const { Users } = require("../models");

module.exports = {
  create: (req, res) => {
    Users.create({
      name: req.body.name,
      email: req.body.email,
      password: require("bcrypt-nodejs").hashSync(req.body.password),
      cities: []
    })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err.errmsg));
  },

  get: (req, res) => {
    if (!req.user) {
      res
        .status(401)
        .json({ message: "NOT LOGGED IN" });
      return;
    }

    Users
      .findOne({ _id: req.user._id }, { name: 1, cities: 1, _id: 0 })
      .populate("cities", null, null, { sort: { createdAt: -1 } })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err.errmsg));
  },

  login: (req, res) => Users
    .findOne({ email: req.body.email })
    .then(user => res.json(user))
    .catch(err => res.status(422).json(err.errmsg))
};
