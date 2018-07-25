const winston = require('winston');

if (process.env.NODE_ENV === 'prod') {
  winston.info('Using production configuration');
  // eslint-disable-next-line
  module.exports = require('./prod');
} else {
  winston.info('Using dev configuration');
  // eslint-disable-next-line
  module.exports = require('./dev');
}
