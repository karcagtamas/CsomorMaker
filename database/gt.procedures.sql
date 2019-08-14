USE csomormaker;
/* Gts */

CREATE OR REPLACE PROCEDURE getGts(_userId int(11))
    BEGIN
        SELECT DISTINCT gts.id, gts.year, gts.tShirtColor, gts.days, gts.members, gts.ready, gts.creater AS createrId, gts.isLocked, gts.greeny, gts.greenyCost, users.name AS creater, gts.startDate, gts.lastUpdate, gts.creationDate, gts.lastUpdater AS lastUpdaterId, u2.name AS lastUpdater  FROM gts 
        INNER JOIN usergtswitch ON gts.id = usergtswitch.gt
        INNER JOIN users ON gts.creater = users.id
        INNER JOIN users u2 ON gts.lastUpdater = users.id
        WHERE usergtswitch.user = _userId AND u2.id = gts.lastUpdater
        ORDER BY gts.year;
    END;

CREATE OR REPLACE PROCEDURE getGt(_gtId int(11))
    BEGIN
        SELECT gts.id, gts.year, gts.tShirtColor, gts.days, gts.members, gts.ready, gts.creater AS createrId, gts.isLocked, gts.greeny, gts.greenyCost, users.name AS creater, gts.startDate, gts.lastUpdate, gts.creationDate, gts.lastUpdater AS lastUpdaterId, u2.name AS lastUpdater FROM gts 
        INNER JOIN users ON gts.creater = users.id
        INNER JOIN users u2 ON gts.lastUpdater = users.id
        WHERE gts.id = _gtId;
    END;

CREATE OR REPLACE PROCEDURE updateGt(_gtId int(11), _year int(4), _tShirtColor varchar(50), _days int(2), _startDate date, _updater int(11))
    BEGIN
        UPDATE gts SET year = _year, tShirtColor = _tShirtColor, days = _days, startDate = _startDate, lastUpdater = _updater, lastUpdate = NOW() WHERE id = _gtId;
    END;

CREATE OR REPLACE PROCEDURE addGt(_year int(4), _creater int(11))
    BEGIN
        INSERT INTO gts(year, creater, lastUpdater) VALUES (_year, _creater, _creater);
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
      SELECT usergtswitch.gt, users.name AS user, users.username AS username, users.id AS userId, usergtswitch.role AS roleId, usergtswitch.connectionDate, eventroles.name AS role, eventroles.accessLevel, users.email, users.tShirtSize, users.class FROM usergtswitch
      INNER JOIN users ON users.id = usergtswitch.user
      INNER JOIN eventroles ON eventroles.id = usergtswitch.role
      WHERE usergtswitch.gt = _gtId
      ORDER BY eventroles.accessLevel DESC, users.name;
    END;

CREATE OR REPLACE PROCEDURE getNonGtMembers(_gtId int(11))
    BEGIN
       SELECT users.id, users.username, users.name, users.role AS roleId, roles.name AS role FROM users
        INNER JOIN roles ON users.role = roles.id 
      WHERE users.id NOT IN (
      SELECT user as id FROM usergtswitch
      WHERE gt = _gtId
      ) ORDER BY users.name;
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
      WHERE gt = _gtId
      ORDER BY name;
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
      SELECT users.id AS workerId, users.name AS worker, users.username, gtworks.id AS workId, gtworks.name as work, gtworkworkerswitch.isActive, gtworkworkerswitch.isBoss, gtworkworkerswitch.isFixed from gtworkworkerswitch
      INNER JOIN users ON users.id = gtworkworkerswitch.worker
      INNER JOIN gtworks ON gtworks.id = gtworkworkerswitch.work
      WHERE gtworkworkerswitch.worker = _workerId AND gtworks.gt = _gtId;
    END;

CREATE OR REPLACE PROCEDURE setGtWorkStatusIsActive(_workerId int(11), _workId int(11))
    BEGIN
        DECLARE _active boolean;
        DECLARE _gtId int(11);
        SELECT isActive INTO _active FROM gtworkworkerswitch WHERE worker = _workerId AND work = _workId;

        IF _active
        THEN
            SET _active = FALSE;
        ELSE
            SET _active = TRUE;
        END IF;
        UPDATE gtworkworkerswitch SET isActive = _active WHERE worker = _workerId AND work = _workId;
        SELECT gt INTO _gtId FROM gtworks WHERE id = _workId; 
        CALL setGtReadyStatus(_gtId, FALSE);
    END;

CREATE OR REPLACE PROCEDURE setGtWorkStatusIsBoss(_workerId int(11), _workId int(11))
    BEGIN
      DECLARE _boss boolean;
      DECLARE _gtId int(11);
        SELECT isBoss INTO _boss FROM gtworkworkerswitch WHERE worker = _workerId AND work = _workId;

        IF _boss
        THEN
            SET _boss = FALSE;
        ELSE
            SET _boss = TRUE;
        END IF;
        UPDATE gtworkworkerswitch SET isBoss = _boss WHERE worker = _workerId AND work = _workId;
        SELECT gt INTO _gtId FROM gtworks WHERE id = _workId; 
        CALL setGtReadyStatus(_gtId, FALSE);
    END;

CREATE OR REPLACE PROCEDURE setGtWorkStatusIsFixed(_workerId int(11), _workId int(11))
    BEGIN
      DECLARE _fix boolean;
      DECLARE _gtId int(11);
        SELECT isFixed INTO _fix FROM gtworkworkerswitch WHERE worker = _workerId AND work = _workId;

        IF _fix
        THEN
            SET _fix = FALSE;
        ELSE
            SET _fix = TRUE;
        END IF;
        UPDATE gtworkworkerswitch SET isFixed = _fix WHERE worker = _workerId AND work = _workId;
        SELECT gt INTO _gtId FROM gtworks WHERE id = _workId; 
        CALL setGtReadyStatus(_gtId, FALSE);
    END;

CREATE OR REPLACE PROCEDURE getLowGtWorkers(_gtId int(11))
    BEGIN
      SELECT usergtswitch.gt, users.id AS id, users.username, users.name, eventroles.accessLevel, usergtswitch.isGeneratable FROM usergtswitch
      INNER JOIN users ON users.id = usergtswitch.user
      INNER JOIN eventroles ON eventroles.id = usergtswitch.role 
      WHERE usergtswitch.gt = _gtId AND eventroles.accessLevel = 1
      ORDER BY users.name;
    END;

CREATE OR REPLACE PROCEDURE getGtWorkers(_gtId int(11))
    BEGIN
      SELECT usergtswitch.gt, users.id AS id, users.username, users.name, eventroles.accessLevel, usergtswitch.isGeneratable FROM usergtswitch
      INNER JOIN users ON users.id = usergtswitch.user
      INNER JOIN eventroles ON eventroles.id = usergtswitch.role 
      WHERE usergtswitch.gt = _gtId AND eventroles.accessLevel <= 2
      ORDER BY users.name;
    END;

CREATE OR REPLACE PROCEDURE getHigherGtWorkers(_gtId int(11))
    BEGIN
      SELECT usergtswitch.gt, users.id AS id, users.username, users.name, eventroles.accessLevel, usergtswitch.isGeneratable FROM usergtswitch
      INNER JOIN users ON users.id = usergtswitch.user
      INNER JOIN eventroles ON eventroles.id = usergtswitch.role 
      WHERE usergtswitch.gt = _gtId AND eventroles.accessLevel = 2
      ORDER BY users.name;
    END;

CREATE OR REPLACE PROCEDURE getGtWorkersForGen(_gtId int(11))
    BEGIN
      SELECT usergtswitch.gt, users.id AS id, users.username, users.name, eventroles.accessLevel, usergtswitch.isGeneratable FROM usergtswitch
      INNER JOIN users ON users.id = usergtswitch.user
      INNER JOIN eventroles ON eventroles.id = usergtswitch.role 
      WHERE usergtswitch.gt = _gtId AND eventroles.accessLevel = 1 OR (eventroles.accessLevel = 2 AND usergtswitch.isGeneratable)
      ORDER BY users.name;
    END;

CREATE OR REPLACE PROCEDURE setGtWorkerStatusGeneratable(_gtId int(11), _workerId int(11))
    BEGIN
      DECLARE _generatable boolean;
        SELECT isGeneratable INTO _generatable FROM usergtswitch WHERE gt = _gtId AND user = _workerId;

        IF _generatable
        THEN
            SET _generatable = FALSE;
        ELSE
            SET _generatable = TRUE;
        END IF;
        UPDATE usergtswitch u SET isGeneratable = _generatable WHERE gt = _gtId AND user = _workerId;
        CALL setGtReadyStatus(_gtId, FALSE);
    END;


CREATE OR REPLACE PROCEDURE getGtWorkerTables(_workerId int(11), _gtId int(11))
    BEGIN
      SELECT users.id AS workerId, users.name AS worker, users.username, gtworkertables.day, gtworkertables.hour, gtworks.id AS workId, gtworks.name as work, gtworkertables.gt from gtworkertables
      INNER JOIN users ON users.id = gtworkertables.worker
      LEFT JOIN gtworks ON gtworks.id = gtworkertables.work
      INNER JOIN usergtswitch ON users.id = usergtswitch.user 
      WHERE gtworkertables.worker = _workerId AND usergtswitch.gt = _gtId
      ORDER BY day, hour;
    END;

CREATE OR REPLACE PROCEDURE updateGtWorkerTable(_gtId int(11), _workerId int(11), _day int(2), _hour int(2), _workId int(11))
    BEGIN
      UPDATE gtworkertables SET work = _workId WHERE gt = _gtId AND worker = _workerId AND day = _day AND hour = _hour;
    END;

CREATE OR REPLACE PROCEDURE clearGtHigherWorkerTable(_gtId int(11), _workerId int(11))
  BEGIN
    UPDATE gtworkertables SET work = NULL WHERE gt = _gtId AND worker = _workerId;
  END;




/* Gt Payouts */

CREATE OR REPLACE PROCEDURE getGtPayouts(_gtId int(11))
  BEGIN
    SELECT gtpayouts.id, gtpayouts.name, gtpayouts.gt, gtpayouts.type AS typeId, gtpayouts.cost, eventpayouttypes.name AS type, eventpayouttypes.isOut, gtpayouts.source AS `from`, gtpayouts.destination AS `to` FROM gtpayouts
    INNER JOIN eventpayouttypes ON eventpayouttypes.id = gtpayouts.type
    WHERE gtpayouts.gt = _gtId
    ORDER BY gtpayouts.type;
  END;

CREATE OR REPLACE PROCEDURE addGtPayout(_gtId int(11), _name varchar(75), _type int(11), _cost decimal, _from varchar(50), _to varchar(50))
  BEGIN
    INSERT INTO gtpayouts(name, gt, type, cost, source, destination)
      VALUES(_name, _gtId, _type, _cost, _from, _to);
  END;

CREATE OR REPLACE PROCEDURE deleteGtPayout(_payoutId int(11))
  BEGIN
    DELETE FROM gtpayouts WHERE id = _payoutId;
  END;

CREATE OR REPLACE PROCEDURE updateGtPayout(_payoutId int(11), _name varchar(75), _type int(11), _cost decimal, _from varchar(50), _to varchar(50))
  BEGIN
    UPDATE gtpayouts SET name = _name, type = _type, cost = _cost, source = _from, destination = _to WHERE id = _payoutId;
  END;

/* Gt Messages */

CREATE OR REPLACE PROCEDURE getGtMessages(_gtId int(11))
  BEGIN
    SELECT gtmessages.id, gtmessages.sender AS senderId, gtmessages.gt, gtmessages.dateOfSent, gtmessages.message, users.name AS sender FROM gtmessages
      INNER JOIN users ON users.id = gtmessages.sender
      WHERE gtmessages.gt = _gtId
    ORDER BY gtmessages.dateOfSent;
  END;

CREATE OR REPLACE PROCEDURE addGtMessage(_gtId int(11), _sender int(11), _message text)
  BEGIN
    INSERT INTO gtmessages(gt, sender, message)
      VALUES(_gtId, _sender, _message);
  END;

/* Gt todoes */

CREATE OR REPLACE PROCEDURE getGtTodoes(_gtId int(11))
  BEGIN
    SELECT * FROM gttodoes
      WHERE gt = _gtId
    ORDER BY isSolved, importance, date DESC;
  END;

CREATE OR REPLACE PROCEDURE addGtTodo(_gtId int(11), _text longtext, _importance int(1), _expirationDate datetime)
  BEGIN
    INSERT INTO gttodoes(gt, text, importance, expirationDate)
      VALUES(_gtId, _text, _importance, _expirationDate);
  END;

CREATE OR REPLACE PROCEDURE updateGtTodo(_todoId int(11), _text longtext, _importance int(1), _expirationDate datetime)
  BEGIN
    UPDATE gttodoes SET text = _text, importance = _importance, expirationDate = _expirationDate WHERE id = _todoId;
  END;

CREATE OR REPLACE PROCEDURE deleteGtTodo(_todoId int(11))
  BEGIN
    DELETE FROM gttodoes WHERE id = _todoId;
  END;

CREATE OR REPLACE PROCEDURE setSolvedGtTodo(_todoId int(11))
  BEGIN
    UPDATE gttodoes SET isSolved = TRUE WHERE id = _todoId;
  END;

/* Gt Classes */

CREATE OR REPLACE PROCEDURE getGtClasses(_gtId int(11))
  BEGIN
    SELECT * FROM gtclasses
      WHERE gt = _gtId
      ORDER BY name;
  END;

CREATE OR REPLACE PROCEDURE addGtClass(_gtId int(11), _name varchar(5))
  BEGIN
    INSERT INTO gtclasses (name, gt, classMaster)
      VALUES(_name, _gtId, _master);
  END;

CREATE OR REPLACE PROCEDURE updateGtClass(_classId int(11), _name varchar(5), _tShirtColor varchar(50), _master varchar(100))
  BEGIN
    UPDATE gtclasses SET name = _name, tShirtColor = _tShirtColor, classMaster = _master WHERE id = _classId;
  END;

CREATE OR REPLACE PROCEDURE deleteGtClass(_classId int(11))
  BEGIN
    DELETE FROM gtclasses WHERE id = _classId;
  END;

/* Gt classmembers */

CREATE OR REPLACE PROCEDURE getGtClassMembers(_classId int(11))
  BEGIN
    SELECT gtclassmembers.id, gtclassmembers.class AS classId, gtclassmembers.name, gtclassmembers.isPaid, gtclassmembers.description, gtclasses.name AS class, gtclassmembers.allergy, gtclassmembers.tShirtSize FROM gtclassmembers
      INNER JOIN gtclasses ON gtclasses.id = gtclassmembers.class
      WHERE gtclassmembers.class = _classId
      ORDER BY name;
  END;

CREATE OR REPLACE PROCEDURE addGtClassMember(_classId int(11), _name varchar(100), _description text, _allergy text, _tShirtSize varchar(6))
  BEGIN
    INSERT INTO gtclassmembers (name, description, class, allergy, tShirtSize)
      VALUES(_name,_description, _classId, _allergy, _tShirtSize);
  END;

CREATE OR REPLACE PROCEDURE updateGtClassMember(_memberId int(11), _name varchar(100),_description text, _allergy text, _tShirtSize varchar(6))
  BEGIN
    UPDATE gtclassmembers SET name = _name, description = _description, allergy = _allergy, tShirtSize = _tShirtSize WHERE id = _memberId;
  END;

CREATE OR REPLACE PROCEDURE deleteGtClassMember(_memberId int(11))
  BEGIN
    DELETE FROM gtclassmembers WHERE id = _memberId;
  END;

CREATE OR REPLACE PROCEDURE setGtClassMemberPaidStatus(_memberId int(11))
  BEGIN
    DECLARE _paid boolean;
     SELECT isPaid INTO _paid FROM gtclassmembers WHERE id = _memberId;

     IF _paid
      THEN
        SET _paid = FALSE;
      ELSE
        SET _paid = TRUE;
      END IF;
      UPDATE gtclassmembers SET isPaid = _paid WHERE id = _memberId;
  END;

CREATE OR REPLACE PROCEDURE countOfAllPaid(_gtId int(11))
    BEGIN
     SELECT COUNT(gtclassmembers.id) AS countOfCosts  FROM gtclassmembers
      INNER JOIN gtclasses ON gtclassmembers.class = gtclasses.id
    WHERE gtclasses.gt = _gtId AND gtclassmembers.isPaid;
    END;

/* Gt meetings */

  CREATE OR REPLACE PROCEDURE getGtMeetings(_gtId int(11))
    BEGIN
      SELECT gtmeetings.id, gtmeetings.date, gtmeetings.creater AS createrId, users.name AS creater, gtmeetings.gt FROm gtmeetings
        INNER JOIN users ON users.id = gtmeetings.creater
      WHERE gtmeetings.gt = _gtId;
    END;

  CREATE OR REPLACE PROCEDURE addGtMeeting(_date date, _creater int(11), _gt int(11))
    BEGIN
      INSERT INTO gtmeetings(date, creater, gt)
      VALUES (_date, _creater, _gt);
    END;

  CREATE OR REPLACE PROCEDURE updateGtMeeting(_id int(11), _date date)
    BEGIN
      UPDATE gtmeetings SET date = _date WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE deleteGtMeeting(_id int(11))
    BEGIN
      DELETE FROM gtmeetings WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE getGtMeetingMembers(_meetingId int(11))
    BEGIN
      SELECT gtmeetingswitch.user AS userId, gtmeetingswitch.meeting, gtmeetingswitch.isThere, users.name AS user FROM gtmeetingswitch
        INNER JOIN users ON users.id = gtmeetingswitch.user 
      WHERE gtmeetingswitch.meeting = _meetingId
      ORDER BY gtmeetingswitch.meeting, gtmeetingswitch.user;
    END;

  CREATE OR REPLACE PROCEDURE setGtMeetingMemberThereStatus(_meeting int(11), _user int(11))
  BEGIN
    DECLARE _there boolean;
     SELECT isThere INTO _there FROM gtmeetingswitch WHERE meeting = _meeting AND user = _user;

     IF _there
      THEN
        SET _there = FALSE;
      ELSE
        SET _there = TRUE;
      END IF;
      UPDATE gtmeetingswitch SET isThere = _there WHERE meeting = _meeting AND user = _user;
  END;

  /* Gt Presenting */

CREATE OR REPLACE PROCEDURE getGtPresenting(_gtId int(11))
    BEGIN
      SELECT user1.id AS presenterId, user1.name AS presenter, user2.id AS presentedId, user2.name AS presented, gtpresentingsswitch.gt, gtpresentingsswitch.isLicensed, gtpresentingsswitch.answer FROM gtpresentingsswitch
      INNER JOIN users as user1 ON gtpresentingsswitch.presenter = user1.id
      INNER JOIN users As user2 ON gtpresentingsswitch.presented = user2.id
      WHERE gt = _gtId
      ORDER BY presenter, presented;
    END;

CREATE OR REPLACE PROCEDURE getGtPresentingForUser(_gtId int(11), _user int(11))
    BEGIN
      SELECT user1.id AS presenterId, user1.name AS presenter, user2.id AS presentedId, user2.name AS presented, gtpresentingsswitch.gt, gtpresentingsswitch.isLicensed, gtpresentingsswitch.answer FROM gtpresentingsswitch
      INNER JOIN users as user1 ON gtpresentingsswitch.presenter = user1.id
      INNER JOIN users As user2 ON gtpresentingsswitch.presented = user2.id
      WHERE gtpresentingsswitch.gt = _gtId AND user1.id = _user AND gtpresentingsswitch.presenter <> gtpresentingsswitch.presented AND gtpresentingsswitch.isLicensed
      ORDER BY presenter, presented;
    END;

CREATE OR REPLACE PROCEDURE updatePresentingAnswer(_gtId int(11), _user1 int(11), _user2 int(11), _answer text)
    BEGIN
      UPDATE gtpresentingsswitch SET answer = _answer WHERE gt = _gtId AND presenter = _user1 AND presented = _user2;
    END;

CREATE OR REPLACE PROCEDURE setGtPresentingLicensedStatus(_gtId int(11), _user1 int(11), _user2 int(11))
  BEGIN
    DECLARE _licensed boolean;
     SELECT isLicensed INTO _licensed FROM gtpresentingsswitch WHERE gt = _gtId AND presenter = _user1 AND presented = _user2;

     IF _licensed
      THEN
        SET _licensed = FALSE;
      ELSE
        SET _licensed = TRUE;
      END IF;
      UPDATE gtpresentingsswitch SET isLicensed = _licensed WHERE gt = _gtId AND presenter = _user1 AND presented = _user2;
  END;

/* Gt questions */

  CREATE OR REPLACE PROCEDURE getGtQuestions(_gtId int(11))
    BEGIN
      SELECT gtquestions.id, gtquestions.question, gtquestions.creater AS createrId, user1.name AS creater, gtquestions.gt, gtquestions.creationDate, gtquestions.lastUpdate, gtquestions.lastUpdater AS lastUpdaterId, user2.name AS lastUpdater FROM gtquestions
        INNER JOIN users AS user1 ON user1.id = gtquestions.creater
        INNER JOIN users AS user2 ON user2.id = gtquestions.lastUpdater
      WHERE gtquestions.gt = _gtId;
    END;

  CREATE OR REPLACE PROCEDURE addGtQuestion(_gtId int(11), _creater int(11), _question varchar(255))
    BEGIN
      INSERT INTO gtquestions(question, creater, lastUpdater, gt)
        VALUES(_question, _creater, _creater, _gtId);
    END;

  CREATE OR REPLACE PROCEDURE updateGtQuestion(_id int(11), _updater int(11), _question varchar(255))
    BEGIN
      UPDATE gtquestions SET question = _question, lastUpdater = _updater, lastUpdate = NOW() WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE deleteGtQuestion(_id int(11))
    BEGIN
      DELETE FROM gtquestions WHERE id = _id;
    END;

  /* Gt answers */

CREATE OR REPLACE PROCEDURE getGtAnswers(_questionId int(11))
    BEGIN
      SELECT * FROM gtanswers WHERE question = _questionId;
    END;

CREATE OR REPLACE PROCEDURE addGtAnswer(_questionId int(11), _answer text, _creater varchar(100))
    BEGIN
      INSERT INTO gtanswers(answer, question, creater)
        VALUES(_answer, _questionId, _creater);
    END;