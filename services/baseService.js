const dbContext = require('../lib/dbContext');

const Factory = function () {
}

Factory.getUserList = function(tr) {
	let sql = `
		SELECT 	[UserId],[UserKey],[UserType],[UserName],[Hash],[DisplayName],[ImageKey],[Email],[Mobile],
				[Title],[Description],[DateOfBirth],[Created],[Updated],[Author],[Editor],[Deleted]
		FROM [dbo].[User]
		ORDER BY UserId ASC
	`;
	return dbContext.getRequest(tr).query(sql);
}

Factory.addUser = function(tr) {
	let sql = `
		INSERT INTO [dbo].[User] (UserKey, UserType, UserName, Hash, DisplayName, Email, DateOfBirth, Author, Editor) 
		VALUES (NEWID(),'USER', 'cashier06', NEWID(),'Cashier01','cashier01@eshop.com','2000-02-02','SYSTEM','SYSTEM');
	`;
	return dbContext.getRequest(tr).query(sql);
}

Factory.editUser = function(tr, displayName, email) {
	let sql = `
		UPDATE [dbo].[User] 
		SET DisplayName = N'${displayName}',
			Email = N'${email}'
		WHERE UserId = 1
	`;
	return dbContext.getRequest(tr).query(sql);
}

module.exports = Factory;