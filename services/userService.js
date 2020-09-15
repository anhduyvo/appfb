const common = require('../lib/common');
const CONSTANTS = require('../lib/constants');
const dbContext = require('../lib/dbContext');

const Factory = function () {
}

Factory.prototype.getUserByKey = function (query) {
	let sql = `
		SELECT 	UserId, UserKey, UserType, UserName, DisplayName, Email, Mobile, Title, Description, DateOfBirth 
		FROM User 
		WHERE UserKey =:UserKey
	`;
	return dbContext.queryItem(sql, { UserKey: query.UserKey });
}

Factory.prototype.getUserByName = function (query) {
	let	sql = `
		SELECT UserId, UserKey, UserType, UserName, DisplayName, Email, Mobile, Title, Description, DateOfBirth 
		FROM User 
		WHERE UserName =:UserName
	`;
	return dbContext.queryItem(sql, { UserName: query.UserName });
}

Factory.prototype.getUserByEmail = function (email) {
	let sql = `
		SELECT UserId, UserKey, UserType, UserName, DisplayName, Email, Mobile, Title, Description, DateOfBirth
		FROM User 
		WHERE Email =:Email
	`;
	return dbContext.queryItem(sql, { Email: email });	
}


Factory.prototype.authenticate = async function (username, password) {
	try
	{
		if(!username)
			throw { code: 'ERROR_UNAUTHENTICATION', message: 'Username is required.' };

		if(!password)
			throw { code: 'ERROR_UNAUTHENTICATION', message: 'Password is required.' };

		let sqlUser = 'SELECT UserKey, UserName, Hash FROM User WHERE UserName=:UserName LIMIT 1';
		let user = await dbContext.queryItem(sqlUser, { UserName: username});
		if(!user)
			throw { code: 'ERROR_UNAUTHENTICATION', message: 'Username is invalid.' };

		if(common.encoded(password) !== user.Hash)
			throw { code: 'ERROR_UNAUTHENTICATION', message: 'Password is invalid.' };
		
		if(username !== user.UserName && password !== user.Hash) {
			return { success: false };
		}
		else {
			return { success: true, username: user.UserName, userkey: user.UserKey };
		}
	}
	catch(err){
		throw err;
	}
}

Factory.prototype.changePassword = async function (userId, hash) {
	try
	{
		let sql = 'UPDATE User SET Hash=:Hash WHERE UserId=:UserId';
		return dbContext.queryExecute(sql,{ UserId: userId, Hash: hash });
	}
	catch(err){
		throw err;
	}
}

Factory.prototype.create = async function (user) {
	try
	{
		user.Hash = common.encoded(user.UserName);
		user.UserType = CONSTANTS.USERTYPES.USER;
		var sql = `
			INSERT INTO User(UserKey,UserType,UserName,Hash,DisplayName,Email,Mobile,Title,Description)
			VALUES(uuid(),:UserType,:UserName,:Hash,:DisplayName,:Email,:Mobile,:Title,:Description)
		`;
		return dbContext.queryExecute(sql, user);
	}
	catch(err){
		throw err;
	}	
}

Factory.prototype.update = async function (user) {
	try
	{
		var sql = `
			UPDATE User
			SET UserName=:UserName,
				DisplayName=:DisplayName,
				Email=:Email,
				Mobile=:Mobile,
				Title=:Title,
				DateOfBirth=:DateOfBirth,
				Description=:Description
			WHERE UserId=:UserId
		`;
		return dbContext.queryExecute(sql, user);
	}
	catch(err){
		throw err;
	}
}

Factory.prototype.delete = async function (userId) {
	try
	{
		var sql = `UPDATE User SET Deleted=1 WHERE UserId=:UserId`;
		return dbContext.queryExecute(sql, {UserId: userId});
	}
	catch(err){
		throw err;
	}
}

module.exports = new Factory;
