var server = require('./server');
var app = server.listen(server.get('port'), function () {
    console.log('Node Js version:', process.version);
    console.log('eShop is running on port: %s', app.address().port);
});

module.exports = app;