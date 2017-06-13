'use strict';

const _ = require('lodash');
const Goods = require('../server/configs/sequelize.js').models.Goods;
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const chemistryData = require('../server/configs/db.js').postgres.initialData.chemistry;
const Promise = require('bluebird');

exports.up = (next) => {
  return GoodsCategories.findAll()
    .then((categories) => {
      return Promise.map(chemistryData, (chemistry) => {
        chemistry.categoryId = _.find(categories, { code: chemistry.categoryCode }).id;
        delete chemistry.categotyCode;
        chemistry.price = parseFloat(chemistry.price.replace(",", "."));
        return Goods.create(chemistry)
      })
    })
    .nodeify(next)
};

exports.down = (next) => {
  var codes = [];
  return Promise.map(chemistryData, (chemistry) => {
    codes.push(chemistry.code);
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