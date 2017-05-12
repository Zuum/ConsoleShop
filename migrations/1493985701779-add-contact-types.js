'use strict';

const _ = require('lodash');
const ContactTypes = require('../server/configs/sequelize.js').models.ContactTypes;
const contactTypesData = require('../server/configs/db.js').postgres.initialData.contactTypes;
const Promise = require('bluebird');

exports.up = (next) => {
  return ContactTypes.bulkCreate(contactTypesData)
    .nodeify(next)
};

exports.down = (next) => {
  var codes = [];
  return Promise.map(contactTypesData, (contactType) => {
    codes.push(contactType.code);
  })
    .then(() => {
      return ContactTypes.destroy({
        where: {
          code: { $in: codes }
        }
      })
    })
    .nodeify(next)
};