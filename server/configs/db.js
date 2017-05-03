'use strict';

let config = {};
config.postgres = {
  connectionString: process.env.DATABASE_URL || 'postgres://test:testtest@localhost:5432/test',
  initialData: {
    navLinks: require('./datasets/navigation-links.json'),
    categories: require('./datasets/categories.json'),
    clocks: require('./datasets/clocks.json')
  }
};

module.exports = config;