const userRoutes = require('./routes-users');

module.exports = function (app) {
  userRoutes(app);
};
