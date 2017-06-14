'use strict';

const _ = require('lodash');
const Goods = require('../server/configs/sequelize.js').models.Goods;
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const plasticData = require('../server/configs/db.js').postgres.initialData.plastic;
const Promise = require('bluebird');

exports.up = (next) => {
  return GoodsCategories.findAll()
    .then((categories) => {
      return Promise.map(plasticData, (plastic) => {
        plastic.categoryId = _.find(categories, { code: plastic.categoryCode }).id;
        delete plastic.categotyCode;
        plastic.price = parseFloat(plastic.price.replace(",", "."));
        return Goods.create(plastic)
          .catch((err) => {

        })
      })
    })
    .nodeify(next)
};

exports.down = (next) => {
  var codes = [];
  return Promise.map(plasticData, (plastic) => {
    codes.push(plastic.code);
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