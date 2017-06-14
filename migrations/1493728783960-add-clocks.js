'use strict';

const _ = require('lodash');
const Goods = require('../server/configs/sequelize.js').models.Goods;
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const clocksData = require('../server/configs/db.js').postgres.initialData.clocks;
const Promise = require('bluebird');

exports.up = (next) => {
  return GoodsCategories.findAll()
    .then((categories) => {
        return Promise.map(clocksData, (clock) => {
          clock.categoryId = _.find(categories, { code: clock.categoryCode }).id;
          delete clock.categotyCode;
          clock.price = parseFloat(clock.price.replace(",", "."));
          return Goods.create(clock)
            .catch((err) => {

            })
        })
      })
  .nodeify(next)
};

exports.down = (next) => {
  var codes = [];
  return Promise.map(clocksData, (clock) => {
    codes.push(clock.code);
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