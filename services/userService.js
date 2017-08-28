const _ = require('lodash');
const Q = require('q');

// Constructor
const Factory = function () { 
}

Factory.prototype.getUsers = function(){
    return data.getUsers();
}

Factory.prototype.getUserByKey = function(){
    return data.getUser();
}


Factory.prototype.createUser = function(user){
    return true;
}

Factory.prototype.updateUser = function(user){
    return true;
}

Factory.prototype.deleteUser = function(userKey){
    return true;
}

module.exports = new Factory;
