const winston = require('winston');
const userService = require('../services/user-service');

module.exports = function (app) {
  app.post('/users', async (req, res) => {
    winston.info('POST /users');
    console.log('Request...', req.body);
    if (!await userService.userExists(req.body.username)) {
      await userService.addUser(req.body.username, req.body.email);
      res.status(200).json({ message: 'ok' });
    } else {
      res.status(409).json({ message: 'username is already used' });
    }
  });

  app.get('/users', async (req, res) => {
    winston.info('GET /users');
    const users = await userService.getUsers();
    res.status(200).json(users);
  });
};
