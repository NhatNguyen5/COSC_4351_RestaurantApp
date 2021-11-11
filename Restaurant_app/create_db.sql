DROP TABLE IF EXISTS userCredentials CASCADE;
DROP TABLE IF EXISTS userInfo CASCADE;
DROP TABLE IF EXISTS reservation CASCADE;
DROP TABLE IF EXISTS tableInfo CASCADE;
DROP TABLE IF EXISTS guestreservation CASCADE;

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
	userID SERIAL,
	guestFirstName TEXT NOT NULL,
	guestLastName TEXT NOT NULL,
	phone varchar(10) NOT NULL,
	email varchar(320) NOT NULL,
	reservationDate DATE NOT NULL,
	reservationTime TIME NOT NULL,
	guestNumber integer NOT NULL,
	isHoliday TEXT NOT NULL,
	tablePicked TEXT NOT NULL,
	PRIMARY KEY(reservationID),
	CONSTRAINT r_userID_fk FOREIGN KEY (userID) REFERENCES userCredentials(userID) ON DELETE CASCADE
);

CREATE TABLE guestReservation(
	gReservationID varchar NOT NULL UNIQUE,
	guestFirstName TEXT NOT NULL,
	guestLastName TEXT NOT NULL,
	phone varchar(10) NOT NULL,
	email varchar(320) NOT NULL,
	reservationDate DATE NOT NULL,
	reservationTime TIME NOT NULL,
	guestNumber integer NOT NULL,
	isTraffic TEXT NOT NULL,
	tablePicked TEXT NOT NULL,
	PRIMARY KEY(gReservationID)
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

/*Test data*/
/*
UPDATE tableInfo SET reserved = 'yes' WHERE tableCode = 'A1';
UPDATE tableInfo SET reserved = 'yes' WHERE tableCode = 'B2';
UPDATE tableInfo SET reserved = 'yes' WHERE tableCode = 'C3';
*/

INSERT INTO userCredentials
VALUES
('0', 'user', 'password');

INSERT INTO userInfo
VALUES
('0','JaneDoe','Baker St', 'Baker St', 100, 'Valid CreditCard');

INSERT INTO Reservation
VALUES 
('0', '0', '2021-12-06', '13:00', 2, 'no', 'A2');

INSERT INTO guestReservation
VALUES 
('0', 'John', 'Doe', '0123456789', 'JDoe@mail.com', '2021-12-06', '13:00', 12, 'no', 'A1,B2,C3');

INSERT INTO guestReservation
VALUES 
('1', 'James', 'Doe', '0123456789', 'JaDoe@mail.com', '2021-12-07', '13:00', 12, 'no', 'A1,A2,A3,A4,B1,B2,B3,B4,C1,C2,C3,D1');

/*'2021-12-06', '13:00'*/
