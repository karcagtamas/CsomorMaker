CREATE DATABASE IF NOT EXISTS csomormaker
CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE csomormaker;

CREATE TABLE roles(
  id int(11) NOT NULL,
  name varchar(100) NOT NULL,
  accessLevel int(1) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE users(
  id int(11) AUTO_INCREMENT NOT NULL,
  username varchar(100) NOT NULL,
  email varchar(255) NOT NULL,
  name varchar(100) NOT NULL,
  role int(11) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_role_roles FOREIGN KEY (role)
  REFERENCES roles(id)
);

CREATE TABLE events(
    id int(11) AUTO_INCREMENT NOT NULL,
    name varchar(50) NOT NULL,
    groupId int(11) NOT NULL,
    isLocked boolean NOT NULL DEFAULT FALSE,
    isDisabled boolean NOT NULL DEFAULT FALSE,
    creater int(11) NOT NULL,
    currentPlayers int(11) NOT NULL DEFAULT 0,
    playerLimit int(11) NOT NULL DEFAULT 0,
    injured int(11) NOT NULL DEFAULT 0,
    visitors int(11) NOT NULL DEFAULT 0,
    visitorLimit int(11) NOT NULL DEFAULT 0,
    playerCost decimal NOT NULL DEFAULT 0,
    visitorCost decimal NOT NULL DEFAULT 0,
    playerDeposit decimal NOT NULL DEFAULT 0,
    PRIMARY KEY(id),
    CONSTRAINT fk_creater_users FOREIGN KEY (creater)
    REFERENCES users(id) 
);

CREATE TABLE payouttypes(
  id int(11) AUTO_INCREMENT NOT NULL,
  name varchar(50) NOT NULL
  );

CREATE TABLE payouts(
  id int(11) AUTO_INCREMENT NOT NULL,
  name varchar(75) NOT NULL,
  eventId int(11) NOT NULL,
  type int(11) NOT NULL,
  cost decimal NOT NULL
);
