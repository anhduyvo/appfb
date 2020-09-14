const _ = require('lodash');
const Q = require('q');

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


// TO DO: deprecated
dbContext.prepareInputParameters = function(request, parameterNames, parameterValues){
    let self = this;
    for(let i=0; i< parameterNames.length; i++){
        if(typeof parameterValues[i] === 'number' && parameterValues[i] <= 999){
            request.input(parameterNames[i], self.mssql.Int, parameterValues[i]);
        } 
        else if(typeof parameterValues[i] === 'number' && parameterValues[i] > 999){
            request.input(parameterNames[i], self.mssql.Decimal, parameterValues[i]);
        } 
        else if(typeof parameterValues[i] === 'datetime'){
            request.input(parameterNames[i], self.mssql.DateTime, parameterValues[i]);
        }
        else if(typeof parameterValues[i] === 'string' && parameterValues[i].length <= 20){
            request.input(parameterNames[i], self.mssql.VarChar(20), parameterValues[i]);
        }
        else if(typeof parameterValues[i] === 'string' && parameterValues[i].length <= 50){
            request.input(parameterNames[i], self.mssql.VarChar(50), parameterValues[i]);
        } 
        else if(typeof parameterValues[i] === 'string' && parameterValues[i].length <= 250){
            request.input(parameterNames[i], self.mssql.VarChar(250), parameterValues[i]);        
        }
        else {
            request.input(parameterNames[i], self.mssql.NVarChar, parameterValues[i]);
        }
    }
    return request;
}

dbContext.prepareOutputParameters = function(request, parameterNames, parameterValues){
    let self = this;
    for(let i=0; i< parameterNames.length; i++){
        request.output(parameterNames[i], self.mssql.VarChar(50), parameterValues[i]);    
    }    
    return request;
}

dbContext.queryList = Q.async(function* (sql, obj){
    try
    {
        if(this.logSql) console.log(sql);
        
        let parameterNames = _.keys(obj);
        let parameterValues = _.values(obj);
        
        let request = this.pool.request();
        this.prepareInputParameters(request, parameterNames, parameterValues);

        let result = yield request.query(sql);
        return result.recordset;
    }
    catch(err){
        throw err;
    }
});

dbContext.queryItem = Q.async(function* (sql, obj){    
    try
    {
        if(logSql) console.log(sql);

        // query one item
        sql = `SELECT TOP 1 TMP.*  FROM (${sql}) TMP`; // only Ms-Sql

        // prepare command
        let parameterNames = _.keys(obj);
        let parameterValues = _.values(obj);

        // query database        
        let request = this.pool.request();
        this.prepareInputParameters(request, parameterNames, parameterValues);
        
        let result = yield request.query(sql);
        return result.recordset[0];
    }
    catch(err){
        throw err;
    }
});

dbContext.queryExecute = Q.async(function* (sql, obj){
    try
    {
        if(this.logSql) console.log(sql);        

        // prepare command
        let parameterNames = _.keys(obj);
        let parameterValues = _.values(obj);

        // query database        
        let request = this.pool.request();
        this.prepareInputParameters(request, parameterNames, parameterValues);
        let result = yield request.query(sql);
        return result;
    }
    catch(err){
        throw err;
    }
});

dbContext.queryExecuteSql = Q.async(function* (tr, sql, obj){
    try
    {
        if(this.logSql) console.log(sql);        

        // prepare command
        let parameterNames = _.keys(obj);
        let parameterValues = _.values(obj);

        // query database        
        let request = this.pool.request();
        this.prepareInputParameters(request, parameterNames, parameterValues);
        let result = yield request.query(sql);
        return result;
    }
    catch(err){
        throw err;
    }
});

module.exports = dbContext;