'use strict';

const _ = require('lodash');
const Goods = require('../server/configs/sequelize.js').models.Goods;
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const steelData = require('../server/configs/db.js').postgres.initialData.steel;
const Promise = require('bluebird');

exports.up = (next) => {
  return GoodsCategories.findAll()
    .then((categories) => {
      return Promise.map(steelData, (steel) => {
        steel.categoryId = _.find(categories, { code: steel.categoryCode }).id;
        delete steel.categotyCode;
        steel.price = parseFloat(steel.price.replace(",", "."));
        return Goods.create(steel)
      })
    })
    .nodeify(next)
};

exports.down = (next) => {
  var codes = [];
  return Promise.map(steelData, (steel) => {
    codes.push(steel.code);
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