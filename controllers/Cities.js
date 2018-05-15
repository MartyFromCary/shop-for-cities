const { Cities, Users, Notes } = require("../models");

module.exports = {

  get: (req, res) =>
    Cities.findOne({ _id: req.params._id })
      .populate("notes", null, null, { sort: { createdAt: -1 } })
      .then(city => res.json(city))
      .catch(err => res.status(422).json(err.errmsg)),

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
  },

  delete: (req, res) => {
    if (!req.user) {
      res.status(401).json({ message: "NOT LOGGED IN" });
      return;
    }
    console.log("DELETE");
    console.log(req.body);
    Notes.deleteMany({ _id: { $in: req.body.notes } })
      .then(notes => {
        console.log(notes);
        Cities.findOneAndRemove({ id: parseInt(req.body._id, 16) })
          .then(city => {
            console.log(city);
            Users.findOneAndUpdate(
              { _id: req.user._id },
              { cities: req.body.cities }
            )
              .then(user => {
                console.log(user);
                res.json(user);
              })
              .catch(err => {
                console.log(err);
                res.status(422).json(err.errmsg);
              });
          }
          )
          .catch(err => {
            console.log(err);
            res.status(422).json(err.errmsg);
          });
      })
      .catch(err => res.status(422).json(err.errmsg));
  }
};