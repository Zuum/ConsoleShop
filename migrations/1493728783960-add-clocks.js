'use strict';

const _ = require('lodash');
const Goods = require('../server/configs/sequelize.js').models.Goods;
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const clocksData = require('../server/configs/db.js').postgres.initialData.clocks;
const Promise = require('bluebird');

exports.up = (next) => {
  return Promise.map(clocksData, (clock) => {
    return GoodsCategories.findOne({ where: { code: clock.categoryCode } })
    .then((category) => {
          delete clock.categotyName;
          clock.categoryId = category.id;
          return Goods.create(clock);
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
  .nodeufy(next)
};