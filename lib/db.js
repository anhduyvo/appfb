'use strict';
const config = require('../config/config.js')
const db = require('knex')(config.db_eshop);

module.exports = db;