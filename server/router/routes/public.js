'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

/* GET App home page. */
module.exports = (app) => {
    app
        .route(/^\/public/i)
        .get((req, res, next) => {
            return res.render('public', {});
        });
};