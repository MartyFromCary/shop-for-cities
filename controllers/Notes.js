const { Cities, Notes } = require("../models");

module.exports = {
  create: (req, res) => {console.log("body");
    console.log(req.body);
    Notes.create({
      title: req.body.title,
      body: req.body.body
    })
      .then(insNote => {
        console.log(insNote);
        Cities.findOneAndUpdate(
          { _id: req.body._id },
          { $push: { notes: insNote._id } }
        )
          .then(note => {
            console.log(note);
            res.json(note);
          })
          .catch(err => res.status(422).json(err.errmsg));
      })
      .catch(err => res.status(422).json(err.errmsg));
  },

  get: (req, res) =>
    Notes.findOne({ _id: req.params._id })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err.errmsg))
};