'use strict';

const Sequelize = require('sequelize');
// Connect Sequelize plugins
require('sequelize-hierarchy')(Sequelize);

const glob = require('glob');
const _ = require('lodash');
const config = require('./db.js');

const models = {};
const pg = new Sequelize(config.postgres.connectionString);

const db = {
    Sequelize,
    pg,
    models
};

// get models file names
const definedModels = glob.sync('server/dao/pg-models/*.js');
// define models
definedModels.forEach((path) => {
        const model = require(`../dao/pg-models/${path.split('/')[3]}`)(db);
        db.models[model.name] = model;
    }
);
// associate models
_.each(db.models, function (model) {
    if ('associate' in model) {
        model.associate(db.models);
    }
});
console.info('database connected...');

module.exports = db;
