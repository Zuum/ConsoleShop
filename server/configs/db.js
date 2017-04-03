'use strict';

let config = {};
config.postgres = {
    connectionString: process.env.DATABASE_URL || 'postgres://test:testtest@localhost:5432/test'
};

module.exports = config;