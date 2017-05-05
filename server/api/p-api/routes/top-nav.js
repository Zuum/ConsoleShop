'use strict';

const dao = require('../../../configs/sequelize.js');
const Links = dao.models.Links;

module.exports = (router) => {
  router.get('/p-api/top-nav', (req, res) => {
    Links.findAll()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            message: 'Запрос завершился с ошибкой'
          });
        });
  });
  router.post('/p-api/top-nav', (req, res) => {
    Links.create(req.body)
        .then((result) => {
          res.status(200).json({
            success: true,
            message: `Запись успешно добавлена`,
            data: result
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            message: 'Запрос завершился с ошибкой'
          });
        })
  });
  router.patch('/p-api/top-nav/:id', (req, res) => {
    Links.update(req.body, { where: { id: req.params.id }, returning: true })
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
          res.status(403).json({
            success: false,
            message: 'Запрос завершился с ошибкой'
          });
        });
  });
  router.delete('/p-api/top-nav/:id', (req, res) => {
    Links.destroy({ where: { id: req.params.id } })
        .then((result) => {
          res.status(200).end('Запись успешно удалена');
        })
        .catch((err) => {
          console.log(err)
          res.status(500).end('Во время удаления записи произошла ошибка');
        });
  });
};