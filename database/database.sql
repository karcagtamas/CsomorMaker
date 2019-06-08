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
    days int(2) NOT NULL DEFAULT 1,
    startHour int(2) NOT NULL DEFAULT 12,
    endHour int(2) NOT NULL DEFAULT 12,
    length int(4),
    ready boolean NOT NULL DEFAULT TRUE,
    PRIMARY KEY(id),
    CONSTRAINT fk_creater_users FOREIGN KEY (creater)
    REFERENCES users(id) 
);

CREATE TABLE usereventswitch(
  user int(11) NOT NULL,
  event int(11) NOT NULL,
  connectionDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(user, event),
  CONSTRAINT fk_user_users_usereventswitch FOREIGN KEY (user)
  REFERENCES users(id),
  CONSTRAINT fk_event_events_usereventswitch FOREIGN KEY (event)
  REFERENCES events(id)  
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
  eventId int(11) NOT NULL,
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

CREATE TABLE works(
  id int(11) AUTO_INCREMENT NOT NULL,
  name varchar(50) NOT NULL,
  event int(11) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_event_events_works FOREIGN KEY (event)
  REFERENCES events(id)
);

CREATE TABLE workTables(
   id int(11) AUTO_INCREMENT NOT NULL,
   day int(2) NOT NULL,
   hour int(2) NOT NULL,
   isActive boolean DEFAULT TRUE,
   worker int(11),
   work int(11) NOT NULL,
   PRIMARY KEY(id),
   CONSTRAINT fk_work_works_workTables FOREIGN KEY (work)
   REFERENCES works(id),
   CONSTRAINT fk_worker_users_workTables FOREIGN KEY (worker)
   REFERENCES users(id)
 );

CREATE TABLE workerTables(
  id int(11) AUTO_INCREMENT NOT NULL,
  day int(2) NOT NULL,
  hour int(2) NOT NULL,
  isAvaiable boolean NOT NULL DEFAULT TRUE,
  work int(11),
  worker int(11) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_work_works_workerTables FOREIGN KEY (work)
  REFERENCES works(id),
  CONSTRAINT fk_worker_users_workerTables FOREIGN KEY (worker)
  REFERENCES users(id)
);

CREATE TABLE workworkerswitch(
  worker int(11) NOT NULL,
  work int(11) NOT NULL,
  isValid boolean NOT NULL DEFAULT TRUE,
  PRIMARY KEY(worker, work),
  CONSTRAINT fk_worker_users_workworkerswitch FOREIGN KEY (worker)
  REFERENCES users(id),
  CONSTRAINT fk_work_works_workworkerswitch FOREIGN KEY (work)
  REFERENCES works(id)
  );
