const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const winston = require('winston');
const mongoose = require('mongoose');

// eslint-disable-next-line
const UserModel = require('./app/model/model-user');

const files = new winston.transports.File({ filename: '.logs/combined.log' });
const console = new winston.transports.Console();

const mongoUri = config.get('mongo_uri');
winston.info(`Connecting to mongo URI ${mongoUri}`);
mongoose.connect(mongoUri, { useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', () => {
  winston.info('Connection to mongo was successful!');
});

winston
  .add(console)
  .add(files);

const port = process.env.PORT || config.get('port');

const app = express();

app.use(bodyParser.json());

require('./app/routes')(app);


app.listen(port, () => {
  winston.info(`Started on port ${port}.`);
});
