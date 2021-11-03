DROP TABLE IF EXISTS userCredentials CASCADE;
DROP TABLE IF EXISTS userInfo CASCADE;
DROP TABLE IF EXISTS reservation CASCADE;
DROP TABLE IF EXISTS tableInfo CASCADE;
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
	CONSTRAINT c_userID_fk FOREIGN KEY (userID) REFERENCES userCredentials(userID) ON DELETE CASCADE
);

CREATE TABLE reservation(
	reservationID varchar NOT NULL UNIQUE,
	guestName TEXT NOT NULL,
	phone integer NOT NULL,
	email varchar(30) NOT NULL,
	date DATE NOT NULL,
	guestNumber integer NOT NULL,
	isTraffic TEXT NOT NULL,
	tablePicked TEXT NOT NULL,
	reservedTime DATE NOT NULL,
	userID SERIAL,
	PRIMARY KEY(reservationID),
	CONSTRAINT r_userID_fk FOREIGN KEY (userID) REFERENCES userCredentials(userID) ON DELETE CASCADE
);

CREATE TABLE tableInfo(
	tableCode varchar NOT NULL,
	seatNum integer NOT NULL,
	reserved TEXT NOT NULL,
    reservationID varchar,
	CONSTRAINT r_userID_fk FOREIGN KEY (reservationID) REFERENCES reservation(reservationID) ON DELETE CASCADE
);

INSERT INTO tableInfo
VALUES
    ('A1',2,'no',NULL
    ),
    ('A2',2,'no',NULL
    ),
    ('A3',2,'no',NULL
    ),
    ('A4',2,'no',NULL
    ),
    ('B1',4,'no',NULL
    ),
    ('B2',4,'no',NULL
    ),
    ('B3',4,'no',NULL
    ),
    ('B4',4,'no',NULL
    ),
    ('C1',6,'no',NULL
    ),
    ('C2',6,'no',NULL
    ),
    ('C3',6,'no',NULL
    ),
    ('D1',8,'no',NULL
    );
