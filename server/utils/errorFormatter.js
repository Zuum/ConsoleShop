'use strict';

const _ = require('lodash');

module.exports = (err, baseMessage) => {
  let message = baseMessage ? baseMessage + ': ' : '';

  if (err.errors && err.errors.length) {
    message += _.map(err.errors, error => `"${error.message}"`).join(', ');
  } else if (typeof err.message === 'string') {
    message += err.message;
  }

  return {
    status: err.name === 'SequelizeValidationError' ? 403 : err.status || 500,
    message
  };
};