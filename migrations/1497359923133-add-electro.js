'use strict';

const _ = require('lodash');
const Goods = require('../server/configs/sequelize.js').models.Goods;
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const electroData = require('../server/configs/db.js').postgres.initialData.electro;
const Promise = require('bluebird');

exports.up = (next) => {
  return GoodsCategories.findAll()
    .then((categories) => {
      return Promise.map(electroData, (electro) => {
        electro.categoryId = _.find(categories, { code: electro.categoryCode }).id;
        delete electro.categotyCode;
        electro.price = parseFloat(electro.price.replace(",", "."));
        return Goods.create(electro)
      })
    })
    .nodeify(next)
};

exports.down = (next) => {
  var codes = [];
  return Promise.map(electroData, (electro) => {
    codes.push(electro.code);
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