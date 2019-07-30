DROP DATABASE IF EXISTS csomormaker;

CREATE DATABASE IF NOT EXISTS csomormaker
CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE csomormaker;

CREATE TABLE news(
  id int(11) NOT NULL AUTO_INCREMENT,
  text text NOT NULL,
  date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  creater int(11) NOT NULL,
  lastUpdate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lastUpdater int(11) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_creater_users_news FOREIGN KEY (creater)
  REFERENCES users(id),
  CONSTRAINT fk_lastUpdater_users_news FOREIGN KEY (lastUpdater)
  REFERENCE users(id)
);

CREATE TABLE notifications(
  id int(11) NOT NULL AUTO_INCREMENT,
  text text NOT NULL,
  date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  owner int(11) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_owner_users_notifications FOREIGN KEY (owner)
  REFERENCES users(id)
);

CREATE TABLE roles(
  id int(11) NOT NULL,
  name varchar(100) NOT NULL,
  accessLevel int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY(id)
);

CREATE TABLE users(
  id int(11) AUTO_INCREMENT NOT NULL,
  username varchar(100) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  password varchar(100) NOT NULL,
  name varchar(100) NOT NULL,
  role int(11) NOT NULL DEFAULT 3,
  PRIMARY KEY(id),
  CONSTRAINT fk_role_roles FOREIGN KEY (role)
  REFERENCES roles(id)
);

CREATE TABLE eventroles(
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  accessLevel int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY(id)
 );

CREATE TABLE events(
    id int(11) AUTO_INCREMENT NOT NULL,
    name varchar(50) NOT NULL,
    isLocked boolean NOT NULL DEFAULT FALSE,
    isDisabled boolean NOT NULL DEFAULT FALSE,
    creater int(11) NOT NULL,
    creationDate datetime NOT NULL DEFAULT NOW(),
    currentPlayers int(11) NOT NULL DEFAULT 0,
    injured int(11) NOT NULL DEFAULT 0,
    visitors int(11) NOT NULL DEFAULT 0,
    visitorLimit int(11) NOT NULL DEFAULT 0,
    playerCost decimal NOT NULL DEFAULT 0,
    visitorCost decimal NOT NULL DEFAULT 0,
    playerDeposit decimal NOT NULL DEFAULT 0,
    days int(2) NOT NULL DEFAULT 1,
    startHour int(2) NOT NULL DEFAULT 12,
    endHour int(2) NOT NULL DEFAULT 12,
    length int(4) DEFAULT 24,
    ready boolean NOT NULL DEFAULT FALSE,
    members int(11) NOT NULL DEFAULT 0,
    startDate date,
    PRIMARY KEY(id),
    CONSTRAINT fk_creater_users FOREIGN KEY (creater)
    REFERENCES users(id) 
);

CREATE TABLE usereventswitch(
  user int(11) NOT NULL,
  event int(11) NOT NULL,
  connectionDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  role int(11) NOT NULL DEFAULT 3,
  PRIMARY KEY(user, event),
  CONSTRAINT fk_user_users_usereventswitch FOREIGN KEY (user)
  REFERENCES users(id),
  CONSTRAINT fk_event_events_usereventswitch FOREIGN KEY (event)
  REFERENCES events(id),
  CONSTRAINT fk_role_eventroles_usereventswitch FOREIGN KEY (role)
  REFERENCES eventroles(id)
);

CREATE TABLE eventpayouttypes(
  id int(11) AUTO_INCREMENT NOT NULL,
  name varchar(50) NOT NULL,
  isOut boolean NOT NULL,
  PRIMARY KEY(id)
  );

CREATE TABLE eventpayouts(
  id int(11) AUTO_INCREMENT NOT NULL,
  name varchar(75) NOT NULL,
  eventId int(11) NOT NULL,
  type int(11) NOT NULL,
  cost decimal NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_type_eventpayouttypes FOREIGN KEY (type)
  REFERENCES eventpayouttypes(id),
  CONSTRAINT fk_eventId_events FOREIGN KEY (eventId)
  REFERENCES events(id)
);

CREATE TABLE eventtodoes(
  id int(11) AUTO_INCREMENT NOT NULL,
  event int(11) NOT NULL,
  date datetime DEFAULT CURRENT_TIMESTAMP,
  text longtext NOT NULL,
  importance int(1) NOT NULL DEFAULT 3,
  isSolved boolean DEFAULT FALSE,
  expirationDate date NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_event_events_eventtodoes FOREIGN KEY (event)
  REFERENCES events(id)
);

CREATE TABLE eventmessages(
  id int(11) AUTO_INCREMENT NOT NULL,
  sender int(11) NOT NULL,
  event int(11) NOT NULL,
  dateOfSent datetime DEFAULT CURRENT_TIMESTAMP,
  message text NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_sender_users_eventmessages FOREIGN KEY (sender)
  REFERENCES users(id),
  CONSTRAINT fk_event_events_eventmessages FOREIGN KEY (event)
  REFERENCES events (id)
);

CREATE TABLE eventworks(
  id int(11) AUTO_INCREMENT NOT NULL,
  name varchar(50) NOT NULL,
  event int(11) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_event_events_eventworks FOREIGN KEY (event)
  REFERENCES events(id)
);

CREATE TABLE eventworktables(
   day int(2) NOT NULL,
   hour int(2) NOT NULL,
   isActive boolean DEFAULT TRUE,
   worker int(11),
   work int(11) NOT NULL,
   PRIMARY KEY(day, hour, work),
   CONSTRAINT fk_work_eventworks_eventworkTables FOREIGN KEY (work)
   REFERENCES eventworks(id) ON DELETE CASCADE,
   CONSTRAINT fk_worker_users_eventworkTables FOREIGN KEY (worker)
   REFERENCES users(id)
 );

CREATE TABLE eventworkertables(
  day int(2) NOT NULL,
  hour int(2) NOT NULL,
  isAvaiable boolean NOT NULL DEFAULT TRUE,
  work int(11),
  worker int(11) NOT NULL,
  event int(11) NOT NULL,
  PRIMARY KEY(day, hour, worker, event),
  CONSTRAINT fk_work_eventworks_eventworkerTables FOREIGN KEY (work)
  REFERENCES eventworks(id) ON DELETE SET NULL,
  CONSTRAINT fk_worker_users_eventworkerTables FOREIGN KEY (worker)
  REFERENCES users(id),
  CONSTRAINT fk_event_events_eventworkerTables FOREIGN KEY (event)
  REFERENCES events(id)
);

CREATE TABLE eventworkworkerswitch(
  worker int(11) NOT NULL,
  work int(11) NOT NULL,
  isValid boolean NOT NULL DEFAULT TRUE,
  PRIMARY KEY(worker, work),
  CONSTRAINT fk_worker_users_eventworkworkerswitch FOREIGN KEY (worker)
  REFERENCES users(id),
  CONSTRAINT fk_work_eventworks_eventworkworkerswitch FOREIGN KEY (work)
  REFERENCES eventworks(id) ON DELETE CASCADE
  );

CREATE TABLE eventteams(
  id int(11) AUTO_INCREMENT NOT NULL,
  name varchar(100) NOT NULL,
  event int(11) NOT NULL,
  members int(11) NOT NULL DEFAULT 0,
  creationDate datetime DEFAULT NOW(),
  PRIMARY KEY (id),
  CONSTRAINT fk_event_events_eventteams FOREIGN KEY (event)
  REFERENCES events(id)
);

CREATE TABLE eventteammembers(
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  isPaidCost boolean NOT NULL DEFAULT FALSE,
  isPaidDeposit boolean NOT NULL DEFAULT FALSE,
  team int(11) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_team_eventteams_eventteammembers FOREIGN KEY (team)
  REFERENCES eventteams(id)
  );



CREATE TRIGGER event_members AFTER INSERT ON usereventswitch
  FOR EACH ROW
  BEGIN
    UPDATE events SET members = members + 1 WHERE id = NEW.event;
  END;

CREATE TRIGGER event_members_de AFTER DELETE ON usereventswitch
  FOR EACH ROW
  BEGIN
    UPDATE events SET members = members - 1 WHERE id = OLD.event;
  END;

CREATE TRIGGER team_members AFTER INSERT ON eventteammembers
  FOR EACH ROW
  BEGIN
    DECLARE _eventId int(11) DEFAULT 0;
    UPDATE eventteams SET members = members + 1 WHERE id = NEW.team;
    SELECT event INTO _eventId FROM eventteams
      WHERE id = NEW.team;
    UPDATE events set currentPlayers = currentPlayers + 1 WHERE id = _eventId;
    
  END;

CREATE TRIGGER team_members_de AFTER DELETE ON eventteammembers
  FOR EACH ROW
  BEGIN
    DECLARE _eventId int(11) DEFAULT 0;
    UPDATE eventteams SET members = members - 1 WHERE id = OLD.team;
    SELECT event INTO _eventId FROM eventteams
      WHERE id = OLD.team;
    UPDATE events set currentPlayers = currentPlayers - 1 WHERE id = _eventId;
    
  END;

CREATE TABLE gts(
  id int(11) NOT NULL AUTO_INCREMENT,
  year int(4) UNIQUE NOT NULL,
  tShirtColor varchar(50) NOT NULL DEFAULT 'Noone',
  days int(2) NOT NULL DEFAULT 3,
  members int(11) NOT NULL DEFAULT 0,
  ready boolean NOT NULL DEFAULT FALSE,
  creater int(11) NOT NULL,
  isLocked boolean NOT NULL DEFAULT FALSE,
  greeny int(11) NOT NULL DEFAULT 0,
  greenyCost decimal NOT NULL DEFAULT 10000,
  startDate date,
  PRIMARY KEY(id),
  CONSTRAINT fk_creater_users_gts FOREIGN KEY (creater)
  REFERENCES users(id)
  );

CREATE TABLE usergtswitch(
  gt int(11) NOT NULL,
  user int(11) NOT NULL,
  role int(11) NOT NULL,
  connectionDate datetime NOT NULL DEFAULT NOW(),
  isGeneratable boolean NOT NULL DEFAULT TRUE,
  PRIMARY KEY(gt,user,role),
  CONSTRAINT fk_gt_gts_usergtswitch FOREIGN KEY (gt)
  REFERENCES gts(id),
  CONSTRAINT fk_user_users_usergtswitch FOREIGN KEY (user)
  REFERENCES users(id),
  CONSTRAINT fk_role_eventroles_usergtswitch FOREIGN KEY (role)
  REFERENCES eventroles(id)
  );

CREATE TABLE gtclasses(
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(5) NOT NULL,
  tShirtColor varchar(50) NOT NULL DEFAULT 'Noone',
  gt int(11) NOT NULL,
  members int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  CONSTRAINT fk_gt_gts_gtclasses FOREIGN KEY (gt)
  REFERENCES gts(id)
  );

CREATE TABLE gtclassmembers(
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  class int(11) NOT NULL,
  isPaid boolean DEFAULT FALSE,
  description text,
  PRIMARY KEY(id),
  CONSTRAINT fk_class_gtclasses_gtclassmembers FOREIGN KEY(class)
  REFERENCES gtclasses(id) ON DELETE CASCADE
  );

CREATE TABLE usersgtclassesswitch(
  user int(11) NOT NULL,
  gtclass int(11) NOT NULL,
  PRIMARY KEY(user, gtclass),
  CONSTRAINT fk_user_users_usersgtclassesswitch FOREIGN KEY (user)
  REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fK_gtclass_gtclasses_usersgtclassesswitch FOREIGN KEY(gtclass)
  REFERENCES gtclasses(id) ON DELETE CASCADE
  );

CREATE TABLE gtworks(
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  day int(2) NOT NULL,
  startHour int(2) NOT NULL,
  endHour int(2) NOT NULL,
  workerCount int(3) NOT NULL,
  gt int(11),
  PRIMARY KEY(id),
  CONSTRAINT fk_gt_gts_gtworks FOREIGN KEY (gt)
  REFERENCES gts(id)
 );

CREATE TABLE gtworktables(
  worker int(11) NOT NULL,
  work int(11) NOT NULL,
  PRIMARY KEY(worker, work),
  CONSTRAINT fk_user_users_gtworktables FOREIGN KEY (worker)
  REFERENCES users (id),
  CONSTRAINT fk_work_gtworks_gtworktables FOREIGN KEY (work)
  REFERENCES gtworks(id) ON DELETE CASCADE
  );

CREATE TABLE gtworkertables(
  worker int(11) NOT NULL,
  day int(2) NOT NULL,
  hour int(2) NOT NULL,
  work int(11),
  gt int(11) NOT NULL,
  PRIMARY KEY(worker, day, hour, gt),
  CONSTRAINT fk_user_users_gtworkertables FOREIGN KEY (worker)
  REFERENCES users (id),
  CONSTRAINT fk_work_gtworks_gtworkertables FOREIGN KEY (work)
  REFERENCES gtworks (id) ON DELETE SET NULL,
  CONSTRAINT fk_gt_gts_gtworkertables FOREIGN KEY (gt)
  REFERENCES gts(id)
  );

CREATE TABLE gtworkworkerswitch(
  worker int(11) NOT NULL,
  work int(11) NOT NULL,
  gt int(11) NOT NULL,
  isActive boolean NOT NULL DEFAULT TRUE,
  isBoss boolean NOT NULL DEFAULT FALSE,
  isFixed boolean NOT NULL DEFAULT FALSE,
  PRIMARY KEY(worker, work),
  CONSTRAINT fk_worker_users_gtworkworkerswitch FOREIGN KEY (worker)
  REFERENCES users (id),
  CONSTRAINT fk_work_gtworks_gtworkworkerswitch FOREIGN KEY (work)
  REFERENCES gtworks(id) ON DELETE CASCADE,
  CONSTRAINT fk_gt_gts_gtworkworkerswitch FOREIGN KEY (gt)
  REFERENCES gts(id) ON DELETE CASCADE
  );

CREATE TABLE gttodoes(
  id int(11) AUTO_INCREMENT NOT NULL,
  gt int(11) NOT NULL,
  date datetime DEFAULT CURRENT_TIMESTAMP,
  text longtext NOT NULL,
  importance int(1) NOT NULL DEFAULT 3,
  isSolved boolean DEFAULT FALSE,
  expirationDate date NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_gt_gts_gttodoes FOREIGN KEY (gt)
  REFERENCES gts(id)
  );

CREATE TABLE gtmessages(
  id int(11) AUTO_INCREMENT NOT NULL,
  sender int(11) NOT NULL,
  gt int(11) NOT NULL,
  dateOfSent datetime DEFAULT CURRENT_TIMESTAMP,
  message text NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_sender_users_gtmessages FOREIGN KEY (sender)
  REFERENCES users(id),
  CONSTRAINT fk_gt_gts_gtmessages FOREIGN KEY (gt)
  REFERENCES gts (id)
);

CREATE TABLE gtpayouts(
  id int(11) AUTO_INCREMENT NOT NULL,
  name varchar(75) NOT NULL,
  gt int(11) NOT NULL,
  type int(11) NOT NULL,
  cost decimal NOT NULL,
  source varchar(50) NOT NULL,
  destination varchar(50) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_type_gtpayouttypes_gtpayouts FOREIGN KEY (type)
  REFERENCES eventpayouttypes(id),
  CONSTRAINT fk_gt_gts_gtpayouts FOREIGN KEY (gt)
  REFERENCES gts(id)
);

CREATE TRIGGER gt_members AFTER INSERT ON usergtswitch
  FOR EACH ROW
  BEGIN
    DECLARE _days int(2);
    DECLARE _currentDay int(2) DEFAULT 1;
    DECLARE _x int(2) DEFAULT 0;

    UPDATE gts SET members = members + 1 WHERE id = NEW.gt;
    INSERT INTO gtworkworkerswitch (work, worker, gt)
       SELECT * FROM (
        SELECT gtworks.id FROM gtworks
        WHERE gtworks.gt = NEW.gt) AS T1
    CROSS JOIN (SELECT NEW.user) AS T2
    CROSS JOIN (SELECT NEW.gt) AS T3;

      CALL setGtReadyStatus(NEW.gt, FALSE);
      DELETE FROM gtworkertables WHERE worker = NEW.user AND gt = NEW.gt;

      SELECT days INTO _days FROM gts WHERE id = NEW.gt;

      WHILE _days + 1 <> _currentDay DO
        SET _x = 0;
        WHILE _x <> 24 DO
            INSERT INTO gtworkertables (worker, day, hour, gt)
            VALUES (NEW.user, _currentDay, _x, NEW.gt);
            SET _x = _x + 1;
          END WHILE;
        SET _currentDay = _currentDay + 1;
      END WHILE;
  END;

CREATE TRIGGER gt_members_de AFTER DELETE ON usergtswitch
  FOR EACH ROW
  BEGIN
    UPDATE gts SET members = members - 1 WHERE id = OLD.gt;
    DELETE FROM gtworkworkerswitch
    WHERE worker = OLD.user AND gtworkworkerswitch.gt = OLD.gt;
    DELETE FROM gtworkertables WHERE worker = OLD.user AND gtworkertables.gt = OLD.gt;
    CALL setGtReadyStatus(OLD.gt, FALSE);
  END;

CREATE TRIGGER gt_members_update AFTER UPDATE ON usergtswitch
  FOR EACH ROW
  BEGIN
    CALL setGtReadyStatus(OLD.gt, FALSE);
  END;

CREATE TRIGGER gt_update AFTER UPDATE ON gts
  FOR EACH ROW
  BEGIN
    DECLARE _days int(2) DEFAULT NEW.days;
    DECLARE _currentDay int(2) DEFAULT 1;
    DECLARE _x int(2) DEFAULT 0;

    IF NEW.days <> OLD.days
      THEN

    DELETE FROM gtworkertables WHERE gt = NEW.id;

      SELECT days INTO _days FROM gts WHERE id = NEW.id;

      WHILE _days + 1 <> _currentDay DO
        SET _x = 0;
        WHILE _x <> 24 DO
            INSERT INTO gtworkertables (worker, day, hour, gt)
              SELECT * FROM (
                SELECT users.id FROM users
                INNER JOIN usergtswitch ON users.id = usergtswitch.user
                WHERE usergtswitch.gt = NEW.id) AS T1
                CROSS JOIN (SELECT _currentDay) AS T2
                CROSS JOIN (SELECT _x) AS T3
                CROSS JOIN (SELECT NEW.id) AS T4;
            SET _x = _x + 1;
          END WHILE;
        SET _currentDay = _currentDay + 1;
      END WHILE;
     END IF;
  END;

CREATE TRIGGER adding_work AFTER INSERT ON gtworks
  FOR EACH ROW
  BEGIN
    INSERT INTO gtworkworkerswitch (worker, work, gt)
       SELECT * FROM (
        SELECT users.id FROM users
        INNER JOIN usergtswitch ON users.id = usergtswitch.user
        WHERE usergtswitch.gt = NEW.gt) AS T1
    CROSS JOIN (SELECT NEW.id) AS T2 CROSS JOIN (SELECT NEW.gt) AS T3;
    CALL setGtReadyStatus(NEW.id, FALSE);
  END;

CREATE TRIGGER deleting_work AFTER DELETE ON gtworks
  FOR EACH ROW
  BEGIN
    DELETE FROM gtworkworkerswitch WHERE work = OLD.id;
    DELETE FROM gtworktables WHERE work = OLD.id;
    CALL setGtReadyStatus(OLD.id, FALSE);
  END;

CREATE TRIGGER work_update AFTER UPDATE ON gtworks
  FOR EACH ROW
  BEGIN
    CALL setGtReadyStatus(NEW.id, FALSE);
  END;

CREATE TRIGGER class_member AFTER INSERT ON gtclassmembers
  FOR EACH ROW
  BEGIN
    UPDATE gtclasses set members = members + 1 WHERE id = NEW.class;
  END;

CREATE TRIGGER class_member_de AFTER DELETE ON gtclassmembers
  FOR EACH ROW
  BEGIN
    UPDATE gtclasses set members = members - 1 WHERE id = OLD.class;
  END;
