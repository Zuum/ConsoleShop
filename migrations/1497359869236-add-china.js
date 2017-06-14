'use strict';

const _ = require('lodash');
const Goods = require('../server/configs/sequelize.js').models.Goods;
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const chinaData = require('../server/configs/db.js').postgres.initialData.china;
const Promise = require('bluebird');

exports.up = (next) => {
  return GoodsCategories.findAll()
    .then((categories) => {
      return Promise.map(chinaData, (china) => {
        china.categoryId = _.find(categories, { code: china.categoryCode }).id;
        delete china.categotyCode;
        china.price = parseFloat(china.price.replace(",", "."));
        return Goods.create(china)
          .catch((err) => {

          })
      })
    })
    .nodeify(next)
};

exports.down = (next) => {
  var codes = [];
  return Promise.map(chinaData, (china) => {
    codes.push(china.code);
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