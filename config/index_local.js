var db_mssql = {
    user: 'sa',
    password: 's@',    
    server: 'SAP-10\\SQL_2019',
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
        host : 'SAP-10\\SQL_2019',
        user : 'sa',
        password : 's@',
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