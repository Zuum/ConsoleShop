'use strict';

const _ = require('lodash');
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const categoriesData = require('../server/configs/db.js').postgres.initialData.categories;
const Promise = require('bluebird');
const copy = require('../server/utils/clone-machine.js');

exports.up = (next) => {
  return GoodsCategories.bulkCreate(categoriesData)
  .nodeify(next);
};

exports.down = (next) => {
  var names = [];
  return Promise.map(categoriesData, (category) => {
    names.push(category.name);
  })
    .then(() => {
        return GoodsCategories.destroy({
          where: {
            name: { $in: names }
          }
        })
      })
      .nodeify(next);
};