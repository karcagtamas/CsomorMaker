USE csomormaker;
/* Gts */

CREATE OR REPLACE PROCEDURE getGts(_userId int(11))
    BEGIN
        SELECT gts.id, gts.year, gts.tShirtColor, gts.days, gts.members, gts.ready, gts.creater AS createrId, gts.isLocked, gts.greeny, gts.greenyCost, users.name AS creater FROM gts 
        INNER JOIN usergtswitch ON gts.id = usergtswitch.gt
        INNER JOIN users ON gts.creater = users.id
        WHERE usergtswitch.user = _userId;
    END;

CREATE OR REPLACE PROCEDURE getGt(_gtId int(11))
    BEGIN
        SELECT gts.id, gts.year, gts.tShirtColor, gts.days, gts.members, gts.ready, gts.creater AS createrId, gts.isLocked, gts.greeny, gts.greenyCost, users.name AS creater FROM gts 
        INNER JOIN users ON gts.creater = users.id
        WHERE gts.id = _gtId;
    END;

CREATE OR REPLACE PROCEDURE updateGt(_gtId int(11), _year int(4), _tShirtColor varchar(50), _days int(2))
    BEGIN
        UPDATE gts SET year = _year, tShirtColor = _tShirtColor, days = _days WHERE id = _gtId;
    END;

CREATE OR REPLACE PROCEDURE addGt(_year int(4), _creater int(11))
    BEGIN
        INSERT INTO gts(year, creater) VALUES (_year, _creater);
        CALL addGtMember(LAST_INSERT_ID(), _creater, 1);
    END;

CREATE OR REPLACE PROCEDURE lockGt(_gtId int(11))
    BEGIN
     DECLARE _lock boolean;
     SELECT isLocked INTO _lock FROM gts WHERE id = _gtId;

     IF _lock
      THEN
        SET _lock = FALSE;
      ELSE
        SET _lock = TRUE;
      END IF;
      UPDATE gts SET isLocked = _lock WHERE id = _gtId;
    END;

CREATE OR REPLACE PROCEDURE gtAccessLevel(_gtId int(11), _userId int(11))
    BEGIN
      SELECT eventroles.accessLevel FROM eventroles
      INNER JOIN usergtswitch ON usergtswitch.role = eventroles.id
      INNER JOIN gts ON usergtswitch.gt = gts.id
      WHERE usergtswitch.user = _userId AND usergtswitch.gt = _gtId;
    END;

CREATE OR REPLACE PROCEDURE setGtReadyStatus(_gtId int(11), _value boolean)
    BEGIN
      UPDATE gts SET ready = _value WHERE id = _gtId;
    END;



/* Members */

CREATE OR REPLACE PROCEDURE getGtMembers(_gtId int(11))
    BEGIN
      SELECT usergtswitch.gt, users.name AS user, users.username AS username, users.id AS userId, usergtswitch.role AS roleId, usergtswitch.connectionDate, eventroles.name AS role, eventroles.accessLevel FROM usergtswitch
      INNER JOIN users ON users.id = usergtswitch.user
      INNER JOIN eventroles ON eventroles.id = usergtswitch.role
      WHERE usergtswitch.gt = _gtId;
    END;

CREATE OR REPLACE PROCEDURE getNonGtMembers(_gtId int(11))
    BEGIN
       SELECT users.id, users.username, users.name, users.role AS roleId, roles.name AS role FROM users
        INNER JOIN roles ON users.role = roles.id 
      WHERE users.id NOT IN (
      SELECT user as id FROM usergtswitch
      WHERE gt = _gtId
      );
    END;

CREATE OR REPLACE PROCEDURE addGtMember(_gtId int(11), _userId int(11), _roleId int(11))
    BEGIN
      INSERT INTO usergtswitch(gt, user, role) VALUES(_gtId, _userId, _roleId);
    END;

CREATE OR REPLACE PROCEDURE deleteGtMember(_gtId int(11), _userId int(11))
    BEGIN
      DELETE FROM usergtswitch WHERE user = _userId AND gt = _gtId;
    END;

CREATE OR REPLACE PROCEDURE updateGtMember(_gtId int(11), _userId int(11), _roleId int(11))
    BEGIN
      UPDATE usergtswitch SET role = _roleId WHERE gt = _gtId AND user = _userId;
    END;

/* Works */

CREATE OR REPLACE PROCEDURE getGtWorks(_gtId int(11))
    BEGIN
      SELECT * from gtworks
      WHERE gt = _gtId;
    END;

CREATE OR REPLACE PROCEDURE addGtWork(_gtId int(11), _name varchar(100), _day int(2), _start int(2), _end int(2), _workers int(3))
    BEGIN
      INSERT INTO gtworks(name, day, startHour, endHour, gt, workerCount)
      VALUES (_name, _day, _start, _end, _gtId, _workers);
    END;

CREATE OR REPLACE PROCEDURE updateGtWork(_workId int(11), _name varchar(100), _day int(2), _start int(2), _end int(2), _workers int(3))
    BEGIN
      UPDATE gtworks SET name = _name, day = _day, startHour = _start, endHour = _end, workerCount = _workers
      WHERE id = _workId;
    END;

CREATE OR REPLACE PROCEDURE deleteGtWork(_workId int(11))
    BEGIN
      DELETE FROM gtworks WHERE id = _workId;
    END;

CREATE OR REPLACE PROCEDURE getGtWorkTables(_workId int(11))
    BEGIN
      SELECT users.id AS workerId, users.name AS worker, users.username, gtworks.id AS workId, gtworks.name as work, gtworks.gt from gtworktables
      INNER JOIN users ON users.id = gtworktables.worker
      INNER JOIN gtworks ON gtworks.id = gtworktables.work
      WHERE gtworktables.work = _workId;
    END;

CREATE OR REPLACE PROCEDURE clearGtWorkTable(_workId int(11))
    BEGIN
      DELETE FROM gtworktables WHERE work = _workId;
    END;

CREATE OR REPLACE PROCEDURE updateGtWorkTable(_workId int(11), _workerId int(11))
    BEGIN
      INSERT INTO gtworktables(work, worker)
        VALUES (_workId, _workerId);
    END;


CREATE OR REPLACE PROCEDURE getGtWorkStatuses(_workerId int(11), _gtId int(11))
    BEGIN
      SELECT users.id AS workerId, users.name AS worker, users.username, gtworks.id AS workId, gtworks.name as work, gtworkworkerswitch.isActive, gtworkworkerswitch.isBoss from gtworkworkerswitch
      INNER JOIN users ON users.id = gtworkworkerswitch.worker
      INNER JOIN gtworks ON gtworks.id = gtworkworkerswitch.work
      WHERE gtworkworkerswitch.worker = _workerId AND gtworks.gt = _gtId;
    END;

CREATE OR REPLACE PROCEDURE setGtWorkStatusIsActive(_workerId int(11), _workId int(11))
    BEGIN
      DECLARE _active boolean;
        SELECT isActive INTO _active FROM gtworkworkerswitch WHERE worker = _workerId AND work = _workId;

        IF _active
        THEN
            SET _active = FALSE;
        ELSE
            SET _active = TRUE;
        END IF;
        UPDATE gtworkworkerswitch SET isActive = _active WHERE worker = _workerId AND work = _workId;
    END;

CREATE OR REPLACE PROCEDURE setGtWorkStatusIsBoss(_workerId int(11), _workId int(11))
    BEGIN
      DECLARE _boss boolean;
        SELECT isBoss INTO _boss FROM gtworkworkerswitch WHERE worker = _workerId AND work = _workId;

        IF _boss
        THEN
            SET _boss = FALSE;
        ELSE
            SET _boss = TRUE;
        END IF;
        UPDATE gtworkworkerswitch SET isBoss = _boss WHERE worker = _workerId AND work = _workId;
    END;

CREATE OR REPLACE PROCEDURE getLowGtWorkers(_gtId int(11))
    BEGIN
      SELECT usergtswitch.gt, users.id AS id, users.username, users.name FROM usergtswitch
      INNER JOIN users ON users.id = usergtswitch.user
      INNER JOIN eventroles ON eventroles.id = usergtswitch.role 
      WHERE usergtswitch.gt = _gtId AND eventroles.accessLevel = 1;
    END;

CREATE OR REPLACE PROCEDURE getGtWorkerTables(_workerId int(11), _gtId int(11))
    BEGIN
      SELECT users.id AS workerId, users.name AS worker, users.username, gtworkertables.day, gtworkertables.hour, gtworks.id AS workId, gtworks.name as work, gtworkertables.gt from gtworkertables
      INNER JOIN users ON users.id = gtworkertables.worker
      LEFT JOIN gtworks ON gtworks.id = gtworkertables.work
      INNER JOIN usergtswitch ON users.id = usergtswitch.user 
      WHERE gtworkertables.worker = _workerId AND usergtswitch.gt = _gtId;
    END;

CREATE OR REPLACE PROCEDURE updateGtWorkerTable(_gtId int(11), _workerId int(11), _day int(2), _hour int(2), _workId int(11))
    BEGIN
      UPDATE gtworkertables SET work = _workId WHERE gt = _gtId AND worker = _workerId AND day = _day AND hour = _hour;
    END;
