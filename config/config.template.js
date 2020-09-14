var db_eshop = {
    client: 'mssql',
    connection: {
        host : 'host', // For docker => docker inspect [containerid]
        user : 'user',
        password : 'password',
        database : 'database',
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
    db_eshop: db_eshop,
    storage: storage,
    azureAuthenticate: true, // false
    secretKey: 'ilovejavascript'
};