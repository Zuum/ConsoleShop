'use strict';

const Promise = require('bluebird');

module.exports = (parameters) => {
  const modelName = parameters[0];

  return Promise.try(() => {
      return require('../../configs/sequelize').models[modelName];
    })
    .then((model) => {
      if (model) {
        return model
          .sync(parameters[1] == 'noforce' ? undefined : { force: true })
          .then((result) => {
            console.log(`Model '${modelName}' synchronized`);
            process.exit(0);
          })
          .catch((error) => {
            console.log(`Model '${modelName}' has not been synchronized. Error: `, error);
            process.exit(1);
          });
      } else {
        console.log(`Model '${modelName}' has not been implemented!`);
        process.exit(1);
      }
    });
};