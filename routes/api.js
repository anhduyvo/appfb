const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Q = require('q');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// GET: test api
router.get('/', function (req, res, next) {
    res.json({ message: 'AppFacebook method GET() is success' });
    console.log('%s %s :: %s', (new Date).toString(), req.method, req.url);	
    next();
});

// POST: test api
router.post('/', function (req, res, next) {
    res.json({ message: 'AppFacebook method POST() is success' });
    console.log('%s %s :: %s', (new Date).toString(), req.method, req.url);
    next();
});


module.exports = router;