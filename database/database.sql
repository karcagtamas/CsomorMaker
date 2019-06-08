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
  name varchar(50) NOT NULL,
  PRIMARY KEY(id)
  );

CREATE TABLE payouts(
  id int(11) AUTO_INCREMENT NOT NULL,
  name varchar(75) NOT NULL,
  eventId int(11) NOT NULL,
  type int(11) NOT NULL,
  cost decimal NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_type_payouttypes FOREIGN KEY (type)
  REFERENCES payouttypes(id),
  CONSTRAINT fk_eventId_events FOREIGN KEY (eventId)
  REFERENCES events(id)
);

CREATE TABLE bosses(
  user int(11) NOT NULL,
  event int(11) NOT NULL,
  promoteDate datetime DEFAULT NOW(),
  PRIMARY KEY(user, event),
  CONSTRAINT fk_user_users_boss FOREIGN KEY (user)
  REFERENCES users(id),
  CONSTRAINT fk_event_events_boss FOREIGN KEY(event)
  REFERENCES events(id)
);

CREATE TABLE todoes(
  id int(11) AUTO_INCREMENT NOT NULL,
  eventId int(11) AUTO_INCREMENT NOT NULL,
  date datetime DEFAULT CURRENT_TIMESTAMP,
  text longtext NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_eventId_events_todo FOREIGN KEY (eventId)
  REFERENCES events(id)
);

CREATE TABLE messages(
  id int(11) AUTO_INCREMENT NOT NULL,
  sender int(11) NOT NULL,
  event int(11) NOT NULL,
  dateOfSent datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT fk_sender_users_messages FOREIGN KEY (sender)
  REFERENCES users(id),
  CONSTRAINT fk_event_events_messages FOREIGN KEY (event)
  REFERENCES events (id)
);
