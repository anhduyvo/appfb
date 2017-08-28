const express = require('express');
const http = require('http');
const path = require("path");

const server = express();
//server.set('port', process.env.PORT || 3000);
server.set('port', 3000);

/**
 * register API 
 */
server.use('/api', require('./routes/api'));

/**
 * register admin site collection
 */
server.use('/admin', express.static(path.join(__dirname, 'admin'), { index: 'default.html' }));

const webpath = path.join(__dirname, 'client'); 
server.use('/', express.static(webpath, { index: 'default.html' }));

module.exports = server;