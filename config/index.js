var mssql = require('mssql');

var db_mssql = {
    provider: mssql,
    user: 'duyanh2005',
    password: 'P@ssw0rd9999',
    server: 'estore-sqlserver.database.windows.net',
    database: 'eshop',
    port: 1433,
    options: {
        enableArithAbort: true,
        encrypt: true
    },
    pool: {
        max: 10,
        min: 2,
        idleTimeoutMillis: 30000
    }
}

var db_eshop = {
    client: 'mssql',
    connection: {
        host : 'estore-sqlserver.database.windows.net', // For docker => docker inspect [containerid]
        user : 'duyanh2005',
        password : 'P@ssw0rd9999',
        database : 'eshop',
        options: {
            encrypt: true,
            enableArithAbort: true
        },
    },
    pool: {
        min: 0,
        max: 10 
    }
};

var storage = {
    fs: {
        provider: "fs",
        destination: "./uploads"
    },
    azure: {
        provider: "azureblob",
        container: "container",
        accountName: "accountName",
        host: "host.blob.core.windows.net",
        accessKey: "accessKey"
    }
};

module.exports = {
    db_mssql: db_mssql,
    db_eshop: db_eshop,
    storage: storage,
    azureAuthenticate: true, // false
    secretKey: 'ilovejavascript'
};