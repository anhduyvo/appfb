var server = require('./server');
var app = server.listen(server.get('port'), function () {    
    console.log('eCompany is running on port: %s by nodejs version %s', app.address().port, process.version);
});

module.exports = app;