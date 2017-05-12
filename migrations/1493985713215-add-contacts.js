'use strict'
const _ = require('lodash');
const Contacts = require('../server/configs/sequelize.js').models.Contacts;
const ContactTypes = require('../server/configs/sequelize.js').models.ContactTypes;
const contactsData = require('../server/configs/db.js').postgres.initialData.contacts;
const Promise = require('bluebird');

exports.up = function(next) {
  return ContactTypes.findAll()
    .then((contactsTypes) => {
      return Promise.map(contactsData, (contact) => {
        contact.contactTypeId = _.find(contactsTypes, {code: contact.contactTypeCode}).id;
        delete contact.contactTypeCode;
        return Contacts.create(contact);
        })
      }).nodeify(next)
};

exports.down = (next) => {
  var codes = [];
  return Promise.map(contactsData, (contactType) => {
    codes.push(contactType.contact);
  })
    .then(() => {
      return Contacts.destroy({
        where: {
          contact: { $in: codes }
        }
      })
    })
    .nodeify(next)
};