const { Cities, Users, Notes } = require("../models");

module.exports = {

  get: (req, res) => Cities
    .findOne({ _id: req.params._id })
    .populate("notes", null, null, {
      sort: {
        createdAt: -1
      }
    })
    .then(city => res.json(city))
    .catch(err => res.status(422).json(err.errmsg)),

  create: (req, res) => {
    if (!req.user == undefined) {
      res
        .status(401)
        .json({ message: "NOT LOGGED IN" });
      return;
    }
    Cities
      .create(req.body)
      .then(city => Users.findByIdAndUpdate(req.user._id, {
        $push: {
          cities: city._id
        }
      }).then(user => res.json(user)).catch(err => res.status(422).json(err.errmsg)))
      .catch(err => res.status(422).json(err.errmsg));
  },

  delete: (req, res) => {
    if (!req.user) {
      res
        .status(401)
        .json({ message: "NOT LOGGED IN" });
      return;
    }
    const cityId = req.body._id;

    Cities.findById(cityId, { notes: 1, _id: 0 })
      .then(city => Notes.deleteMany({ _id: { $in: city.notes } })
        .then(() => Cities.findByIdAndRemove(cityId)
          .then(() => Users.findByIdAndUpdate(req.user._id, { $pull: { cities: cityId } })
            .then(user => res.json(user.cities))
            .catch(err => res.status(422).json(err.errmsg)))
          .catch(err => res.status(422).json(err.errmsg)))
        .catch(err => res.status(422).json(err.errmsg)))
      .catch(err => res.status(422).json(err.errmsg))
  }
};