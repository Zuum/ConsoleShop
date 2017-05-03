'use strict';

const _ = require('lodash');
const Goods = require('../server/configs/sequelize.js').models.Goods;
const GoodsCategories = require('../server/configs/sequelize.js').models.GoodsCategories;
const clocksData = require('../server/configs/db.js').postgres.initialData.clocks;
const Promise = require('bluebird');
const copy = require('../server/utils/clone-machine.js');

exports.up = (next) => {

};

exports.down = (next) => {

};