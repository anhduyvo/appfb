const _ = require('lodash');
const Q = require('q');

// start connection pool
const mssql = require('mssql');
const config = require('../config').db_mssql;
const pool = new mssql.ConnectionPool(config);
const logSql = false;

const dbContext = function() {
}

dbContext.connect = function() {
    return pool.connect().then(res => {
        console.log(`Database is running on: ${config.server} at port: ${config.port}`);
        return true;
    }).catch(err => {
        throw err;
    });
}

dbContext.close = function() {
    if(pool.connected || pool.connecting) {
        return pool.close();
    }
}

dbContext.getTransaction = async function() {
    if(!pool.connected) {
        await pool.connect();
    }
    const tr = new mssql.Transaction(pool);
    return tr;
}

dbContext.getRequest = function(tr) {    
    const request = new mssql.Request(tr);
    return request;
}

dbContext.queryList = async function(tr, sql, obj) {
    try
    {
        if(logSql) console.log(sql);
        
        let parameterNames = _.keys(obj);
        let parameterValues = _.values(obj);

        const request = new mssql.Request(tr);
        prepareInputParameters(request, parameterNames, parameterValues);

        let result = await request.query(sql);
        return result.recordset[0];
    }
    catch(err) {
        throw err;
    }
};

dbContext.queryItem = async function(tr, sql, obj) {
    try
    {
        if(logSql) console.log(sql);        
        
        let parameterNames = _.keys(obj);
        let parameterValues = _.values(obj);

        const request = new mssql.Request(tr);
        const sqlQuery = `SELECT TOP 1 TMP.*  FROM (${sql}) TMP`;
        prepareInputParameters(request, parameterNames, parameterValues);

        let result = await request.query(sqlQuery);
        return result.recordset[0];
    }
    catch(err) {
        throw err;
    }
};

dbContext.queryExecute = async function(tr, sql, obj) {
    try
    {
        if(logSql) console.log(sql);
        
        let parameterNames = _.keys(obj);
        let parameterValues = _.values(obj);

        const request = new mssql.Request(tr);
        prepareInputParameters(request, parameterNames, parameterValues);

        let result = await request.query(sql);
        return result
    }
    catch(err){
        throw err;
    }
};

const prepareInputParameters = function(request, parameterNames, parameterValues) {
    for(let i=0; i< parameterNames.length; i++){
        if(typeof parameterValues[i] === 'number' && parameterValues[i] <= 999){
            request.input(parameterNames[i], mssql.Int, parameterValues[i]);
        } 
        else if(typeof parameterValues[i] === 'number' && parameterValues[i] > 999){
            request.input(parameterNames[i], mssql.Decimal, parameterValues[i]);
        } 
        else if(typeof parameterValues[i] === 'datetime'){
            request.input(parameterNames[i], mssql.DateTime, parameterValues[i]);
        }
        else if(typeof parameterValues[i] === 'string' && parameterValues[i].length <= 20){
            request.input(parameterNames[i], mssql.VarChar(20), parameterValues[i]);
        }
        else if(typeof parameterValues[i] === 'string' && parameterValues[i].length <= 50){
            request.input(parameterNames[i], mssql.VarChar(50), parameterValues[i]);
        } 
        else if(typeof parameterValues[i] === 'string' && parameterValues[i].length <= 250){
            request.input(parameterNames[i], mssql.VarChar(250), parameterValues[i]);        
        }
        else {
            request.input(parameterNames[i], mssql.NVarChar, parameterValues[i]);
        }
    }
    return request;
};

module.exports = dbContext;