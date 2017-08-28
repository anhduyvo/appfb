USE master;
DROP DATABASE [appfb];
CREATE DATABASE [appfb];

USE [appfb];
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/****** Object:  Table [dbo].[User] ******/
CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserKey] [nvarchar](50) NOT NULL,	
    [UserType] [nvarchar](20) NULL,
	[UserName] [nvarchar](50) NULL,
	[Hash] [nvarchar](50) NOT NULL,	
	[DisplayName] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[Mobile] [nvarchar](50) NULL,
	[Tel] [nvarchar](50) NULL,
	[Title] [nvarchar](50) NULL,
	[DateOfBirth] [datetime] DEFAULT CURRENT_TIMESTAMP,  	
	[Created] [datetime] DEFAULT CURRENT_TIMESTAMP,
	[Updated] [datetime] DEFAULT CURRENT_TIMESTAMP,
	[Author] [nvarchar](50) NULL,
	[Editor] [nvarchar](50) NULL,
    [Deleted] [int] DEFAULT 0
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

INSERT INTO [dbo].[User] (UserKey, UserType, UserName, Hash, DisplayName, Email, DateOfBirth, Author, Editor) VALUES (NEWID(),'USER', 'beckham',NEWID(),'David Beckham','hoanganh@ibm.com','1990-03-03','SYSTEM','SYSTEM');
INSERT INTO [dbo].[User] (UserKey, UserType, UserName, Hash, DisplayName, Email, DateOfBirth, Author, Editor) VALUES (NEWID(),'USER', 'huetran',NEWID(),'Hue Tran','huetran@hvn.com','1990-04-04','SYSTEM','SYSTEM');
INSERT INTO [dbo].[User] (UserKey, UserType, UserName, Hash, DisplayName, Email, DateOfBirth, Author, Editor) VALUES (NEWID(),'ADMIN','admin',  NEWID(),'John Mike','john@microsoft.com','2000-12-26','SYSTEM','SYSTEM');
INSERT INTO [dbo].[User] (UserKey, UserType, UserName, Hash, DisplayName, Email, DateOfBirth, Author, Editor) VALUES (NEWID(),'USER', 'avo4',   NEWID(),'Anh Vo','avo4@csc.com','1984-12-22','SYSTEM','SYSTEM');
INSERT INTO [dbo].[User] (UserKey, UserType, UserName, Hash, DisplayName, Email, DateOfBirth, Author, Editor) VALUES (NEWID(),'USER', 'anhvod', NEWID(),'Vo Duy Anh','anhvod@hvn.com','1984-12-24','SYSTEM','SYSTEM');
INSERT INTO [dbo].[User] (UserKey, UserType, UserName, Hash, DisplayName, Email, DateOfBirth, Author, Editor) VALUES (NEWID(),'USER', 'lukaku', NEWID(),'Lukaku','lukaku@sony.com','1982-08-08','SYSTEM','SYSTEM');
INSERT INTO [dbo].[User] (UserKey, UserType, UserName, Hash, DisplayName, Email, DateOfBirth, Author, Editor) VALUES (NEWID(),'USER', 'pogba',  NEWID(),'Pogba','pogba@samsung.com','1985-06-06','SYSTEM','SYSTEM');
INSERT INTO [dbo].[User] (UserKey, UserType, UserName, Hash, DisplayName, Email, DateOfBirth, Author, Editor) VALUES (NEWID(),'USER', 'khavo',  NEWID(),'Pogba','khavo@csc.com','1992-06-06','SYSTEM','SYSTEM');
