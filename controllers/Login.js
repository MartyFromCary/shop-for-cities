const { Users } = require("../models");

module.exports = {
  login: (req, res) => {
    Users.findOne({
      email: req.body.email
    })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err.errmsg));
  },

  test: (req, res) => {
    console.log("api/login/test");
    if (req.user) {
      res.json(req.user);
    } else {
      console.log("NONE");
      res.json({});
    }
  }
};
