const { Cities, Notes } = require("../models");

module.exports = {
  create: (req, res) =>
    Notes.create({
      title: req.body.title,
      body: req.body.body
    })
      .then(note =>
        Cities.findOneAndUpdate(
          { _id: req.body._id },
          { $push: { notes: note._id } }
        )
          .then(note => res.json(note))
          .catch(err => res.status(422).json(err.errmsg))
      )
      .catch(err => res.status(422).json(err.errmsg)),
  get: (req, res) =>
    Notes.findOne({ _id: req.params._id })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err.errmsg))
};
