'use strict';

const _ = require('lodash');
const Goods = require('../server/configs/sequelize.js').models.Goods;
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const glassData = require('../server/configs/db.js').postgres.initialData.glass;
const Promise = require('bluebird');

exports.up = (next) => {
  return GoodsCategories.findAll()
    .then((categories) => {
      return Promise.map(glassData, (glass) => {
        glass.categoryId = _.find(categories, { code: glass.categoryCode }).id;
        delete glass.categotyCode;
        glass.price = parseFloat(glass.price.replace(",", "."));
        return Goods.create(glass)
      })
    })
    .nodeify(next)
};

exports.down = (next) => {
  var codes = [];
  return Promise.map(glassData, (glass) => {
    codes.push(glass.code);
  })
    .then(() => {
      return Goods.destroy({
        where: {
          code: { $in: codes }
        }
      })
    })
    .nodeify(next)
};