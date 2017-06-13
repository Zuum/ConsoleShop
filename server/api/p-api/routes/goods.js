'use strict';

const _ = require('lodash');
const Sequelize = require('../../../configs/sequelize.js');

const Goods = Sequelize.models.Goods;
const GoodsCategories = Sequelize.models.GoodsCategories;

module.exports = (router) => {
  router
    .get('/p-api/goods', (req, res) => {
      let offset = req.query.skip || 0;
      let limit = req.query.limit || null;
      let type = req.query.goodsType;

      const query = type? { offset, limit, include: [ { model: GoodsCategories, where: { code: type } } ]  } :
      { offset, limit, include: [ { model: GoodsCategories } ] };
      Goods.findAll(query)
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
    })
    .post((req, res) => {
      Goods.create(req.body)
        .then((result) => {
          res.status(200).json({
            success: true,
            message: `Запись успешно создана`,
            data: result
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(err.name === 'SequelizeValidationError' ? 403 : 500)
            .json({
              success: false,
              message: 'Запрос завершился с ошибкой'
            });
        });
    });
  router
    .get('/p-api/goods/qty', (req, res) => {
      let type = req.query.goodsType;

      Goods.count(type? { include: [ { model: GoodsCategories, where: { code: type } } ] } :
      {include: [ { model: GoodsCategories } ] })
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
  router
    .get('/p-api/goods/:id', (req, res) => {
      Goods.findOne({where: {id: req.params.id}})
        .then((result) => {
          res.status(200)
            .json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500)
            .json({
              success: false,
              message: 'Запрос завершился с ошибкой'
            });
        });
    })
    .patch((req, res) => {
      Goods.update(req.body, {where: {id: req.params.id}, returning: true})
        .then((result) => {
          res.status(200)
            .json({
              success: true,
              message: 'Изменения успешно сохранены',
              result: result[1]
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(403)
            .end(err.message);
        });
    })
    .delete((req, res) => {
      Goods
        .destroy({ where: { id: req.params.id } })
        .then((result) => {
          res.status(200).end('Запись успешно удалена');
        })
        .catch((err) => {
          res.status(500).end('Во время удаления записи произошла ошибка');
          console.log(err);
        });
    });
};