const bcrypt = require("bcrypt-nodejs");

module.exports = {
  hash: userPassword => bcrypt.hashSync(userPassword),
  validate: (userPassword, hashedPassword) =>
    bcrypt.compareSync(userPassword, hashedPassword)
};
