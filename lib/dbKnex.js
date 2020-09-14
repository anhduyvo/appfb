'use strict';
const config = require('../config/config.js')
const dbKnex = require('knex')(config.db_eshop);

module.exports = dbKnex;