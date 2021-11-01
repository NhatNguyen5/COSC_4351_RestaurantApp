DROP TABLE IF EXISTS userCredentials CASCADE;
DROP TABLE IF EXISTS userInfo CASCADE;
DROP TABLE IF EXISTS guest CASCADE;
DROP TABLE IF EXISTS tableInfo CASCADE;
DROP TABLE IF EXISTS tableStatus CASCADE;

/*
CREATE EXTENSION pgcrypto;
*/

CREATE TABLE userCredentials(
	userID SERIAL NOT NULL UNIQUE,
	loginID TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	PRIMARY KEY(userID)
);

CREATE TABLE userInfo(
	userID SERIAL NOT NULL,
	fullname TEXT NOT NULL,
	mailAddress TEXT NOT NULL,
	billAddress TEXT,
	points integer NOT NULL,
	preferPayment TEXT NOT NULL,
	CONSTRAINT c_userID_fk FOREIGN KEY (userID) REFERENCES UserCredentials(userID) ON DELETE CASCADE
);

CREATE TABLE guest(
	guestName TEXT NOT NULL,
	phone integer NOT NULL,
	email varchar(30) NOT NULL,
	date DATE NOT NULL,
	guestNumber integer NOT NULL
);

CREATE TABLE reservations

CREATE TABLE tableInfo(
	tableCode TEXT,
	noOfSeats INTEGER,
	reserved INTEGER,
	CONSTRAINT c_userID_fk FOREIGN KEY (userID) REFERENCES UserCredentials(userID) ON DELETE CASCADE
);

INSERT INTO tableStatus (tableCode, noOfSeats, reserved) 
VALUES 
	 ('A1', 2, 0)
	,('A2', 2, 0)
	,('A3', 2, 0)
	,('A4', 2, 0)
	,('B1', 4, 0)
	,('B2', 4, 0)
	,('B3', 4, 0)
	,('B4', 4, 0)
	,('C1', 6, 0)
	,('C2', 6, 0)
	,('C3', 6, 0)
	,('D1', 8, 0);

