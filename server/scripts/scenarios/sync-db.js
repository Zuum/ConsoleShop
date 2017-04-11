'use strict';

module.exports = (parameters) => {
  return require('../../configs/sequelize').pg
    .sync(parameters[0] == 'noforce' ? undefined : { force: true })
    .then(() => {
      console.log('DB synchronization successfully completed');
      process.exit(0);
    })
    .catch((err) => {
      console.log(`DB synchronization failed with error: ${err.message}`);
      process.exit(1);
    });
};