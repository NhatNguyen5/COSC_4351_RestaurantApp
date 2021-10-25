DROP TABLE IF EXISTS userCredentials CASCADE;
DROP TABLE IF EXISTS userInfo CASCADE;
DROP TABLE IF EXISTS guest CASCADE;
CREATE EXTENSION pgcrypto;

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
	point integer NOT NULL,
	preferPayment TEXT NOT NULL,
	CONTRAINT c_userID_fk FOREIGN KEY (userID) REFERENCES userCredentials(userID) ON DELETE CASCADE)
);

CREATE TABLE guest(
	guestName TEXT NOT NULL,
	phone integer NOT NULL,
	email varchar(30) NOT NULL,
	date DATE NOT NULL,
	guestNumber integer NOT NULL
);
