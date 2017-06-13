'use strict';

let config = {};
config.postgres = {
  connectionString: process.env.DATABASE_URL || 'postgres://test:testtest@localhost:5432/test',
  initialData: {
    navLinks: require('./datasets/navigation-links.json'),
    categories: require('./datasets/categories.json'),
    clocks: require('./datasets/clocks.json'),
    china: require('./datasets/china.json'),
    chemistry: require('./datasets/chemistry.json'),
    glass: require('./datasets/glass.json'),
    electro: require('./datasets/electro.json'),
    plastic: require('./datasets/plastic.json'),
    steel: require('./datasets/steel.json'),
    contactTypes: require('./datasets/contact-types.json'),
    contacts: require('./datasets/contacts.json')
  }
};

module.exports = config;