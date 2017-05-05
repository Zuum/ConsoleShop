'use strict';

const _ = require('lodash');
const Sequelize = require('../../../configs/sequelize.js');

const Goods = Sequelize.models.Goods;
const GoodsCategories = Sequelize.models.GoodsCategories;

module.exports = (router) => {
  router
      .get('/p-api/goods/qty', (req, res) => {
        Goods.count({include: [{model: GoodsCategories, where: {code: CLOCKS}}]})
            .then((result) => {
              res.status(200)
                  .json(result || []);
            })
            .catch((err) => {
              console.log(err);
              res.status(500)
                  .json({
                    success: false,
                    message: 'Запрос завершился с ошибкой'
                  });
            });
      });
};