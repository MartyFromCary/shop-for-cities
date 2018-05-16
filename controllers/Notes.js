const { Cities, Notes } = require("../models");

module.exports = {
  get: (req, res) =>
    Notes.findOne({ _id: req.params._id })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err.errmsg)),

  create: (req, res) =>
    Notes.create({
      title: req.body.title,
      body: req.body.body
    })
      .then(insNote =>
        Cities.findOneAndUpdate(
          { _id: req.body._id },
          { $push: { notes: insNote._id } }
        )
          .then(note => res.json(note))
          .catch(err => res.status(422).json(err.errmsg))
      )
      .catch(err => res.status(422).json(err.errmsg)),

  update: (req, res) =>
    Notes.findOneAndUpdate(
      { _id: req.body._id },
      { title: req.body.title, body: req.body.body }
    )
      .then(note => res.json(note))
      .catch(err => res.status(422).json(err.errmsg)),

  delete: (req, res) =>
    Notes.findOneAndRemove({ _id: req.body.noteId })
      .then(delNote =>
        Cities.findOneAndUpdate(
          { _id: req.body._id },
          { notes: req.body.notes }
        )
          .then(city => res.json(city))
          .catch(err => res.status(422).json(err.errmsg))
      )
      .catch(err => res.status(422).json(err.errmsg))
};