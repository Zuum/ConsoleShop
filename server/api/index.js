'use strict';

const path = require('path');

module.exports = (app) => {
    require('./p-api')(app);
    require('./a-api')(app);
};