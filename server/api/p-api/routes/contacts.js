/**
 * Created by d1m4o on 05.05.17.
 */
'use strict';

const _ = require('lodash');
const Sequelize = require('../../../configs/sequelize.js');

const Contacts = Sequelize.models.Contacts;
const ContactTypes= Sequelize.models.ContactTypes;


module.exports = (router) => {
  router
    .get('/p-api/contacts', (req, res) => {
      let offset = req.query.skip;
      let limit = req.query.limit;

      const query = { offset, limit, include: [ { model: ContactTypes } ]  };
      Contacts.findAll(query)
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
      Contacts.create(req.body)
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
    .get('/p-api/contacts/:id', (req, res) => {
      Contacts.findOne({where: {id: req.params.id}})
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
      Contacts.update(req.body, {where: {id: req.params.id}, returning: true})
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
      Contacts
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