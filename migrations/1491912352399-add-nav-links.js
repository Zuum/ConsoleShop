'use strict';

const _ = require('lodash');
const Links = require('../server/configs/sequelize.js').models.Links;
const linksData = require('../server/configs/db.js').postgres.initialData.navLinks;
const Promise = require('bluebird');

exports.up = (next) => {
    return Links.bulkCreate(linksData)
    .nodeify(next);
};

exports.down = (next) => {
  var names = [];
  return Promise.map(linksData, (link) => {
    names.push(link.name);
  }).then(() => {
    return Links.destroy({
      where: {
        name: { $in: names }
      }
    })
  })
  .nodeify(next)
};