var db_mssql = {
    user        :'user',
    password    :'password',
    server      :'server',
    database    :'database',
    port        :'port',
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
        host        :'host', // For docker => docker inspect [containerid]
        user        :'user',
        password    :'password',
        database    :'database',
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
    azureAuthenticate: false,
    secretKey: 'ilovejavascript'
};