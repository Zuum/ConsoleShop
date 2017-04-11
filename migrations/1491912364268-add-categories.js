'use strict';

const _ = require('lodash');
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const categoriesData = require('../server/configs/db.js').postgres.initialData.categories;
const Promise = require('bluebird');
const copy = require('../server/utils/clone-machine.js');

exports.up = (next) => {
  return Promise.map(categoriesData, (category) => {
    var mainCategory = {};
    mainCategory.name = category.name;
    return GoodsCategories.create(mainCategory)
      .then((instance) => {
        var subCategories = [];
        var tmp = {};
        tmp.parentId = instance.id;
        return Promise.map(category.children, (item) => {
          tmp.name = item.name;
          subCategories.push(copy(tmp));
        })
          .then(() => {
            return GoodsCategories.bulkCreate(subCategories)
          })
      })
    })
  .nodeify(next);
};

exports.down = (next) => {
  var names = [];
  Promise.map(categoriesData, (category) => {
    names.push(category.name);
    return Promise.map(category.children, (item) => {
      names.push(item.name);
    })
      .then(() => {
          return GoodsCategories.destroy({
            where: {
              name: { $in: names }
            }
          })
        })
  })
      .nodeify(next);
};