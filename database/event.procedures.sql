USE csomormaker;

CREATE PROCEDURE disableEvent(_eventId int(11))
    BEGIN
        UPDATE events SET isDisabled = TRUE WHERE id = _eventId;
    END;

CREATE PROCEDURE getEvent(_id int(11))
    BEGIN
     SELECT events.id, 
      events.name,
      events.isLocked, 
      events.isDisabled, 
      events.currentPlayers, 
      events.injured, 
      events.visitors, 
      events.visitorLimit, 
      events.playerCost, 
      events.visitorCost, 
      events.playerDeposit, 
      events.days, 
      events.startHour, 
      events.endHour, 
      events.length, 
      events.ready, 
      events.creationDate,
      events.members,
      events.creater AS createId, 
      users.name AS creater, 
      events.startDate,
      events.lastUpdate,
      events.lastUpdater AS lastUpdaterId,
      u2.name AS lastUpdater,
      events.fixTeamCost,
      events.fixTeamDeposit
      FROM events
      INNER JOIN users ON events.creater = users.id
      INNER JOIN users u2 ON events.lastUpdater = u2.id
      WHERE NOT events.isDisabled AND events.id = _id;
    END;

DROP PROCEDURE IF EXISTS getUsersEvents;
CREATE PROCEDURE getUsersEvents(_userId int(11))
    BEGIN
      SELECT DISTINCT events.id, 
      events.name,
      events.isLocked, 
      events.isDisabled, 
      events.currentPlayers, 
      events.injured, 
      events.visitors, 
      events.visitorLimit, 
      events.playerCost, 
      events.visitorCost, 
      events.playerDeposit, 
      events.days, 
      events.startHour, 
      events.endHour, 
      events.length, 
      events.ready, 
      events.creationDate,
      events.members,
      events.creater AS createId, 
      users.name AS creater, 
      events.startDate,
      events.lastUpdate,
      events.lastUpdater AS lastUpdaterId,
      u2.name AS lastUpdater,
      events.fixTeamCost,
      events.fixTeamDeposit
      FROM events
      INNER JOIN usereventswitch ON events.id = usereventswitch.event
      INNER JOIN users ON events.creater = users.id
      INNER JOIN users u2 ON events.lastUpdater = u2.id
      WHERE NOT events.isDisabled AND usereventswitch.user = _userId;
    END;

CREATE PROCEDURE addEvent(_name varchar(50), _creater int(11))
    BEGIN
    DECLARE _event int(2) DEFAULT 0;
     INSERT INTO events (name, creater, lastUpdater)
      VALUES (_name, _creater, _creater);
      SET _event = LAST_INSERT_ID();
     CALL addUserToEvent(_creater, _event, 1);
     INSERT INTO eventroles(name, accessLevel, event)
        VALUES ('Főszervező', 4, _event),
          ('Posztfőszervező', 2, _event),
          ('Humán', 1, _event),
          ('Fejlesztő', 3, _event);
    END;

DROP PROCEDURE IF EXISTS updateEvent;
CREATE PROCEDURE updateEvent(
    _id int(11),
    _name varchar(50),
    _injured int(11),
    _visitors int(11),
    _visitorLimit int(11),
    _playerCost decimal,
    _visitorCost decimal,
    _playerDeposit decimal,
    _days int(2),
    _startHour int(2),
    _endHour int(2),
    _length int(4),
    _startDate date,
    _updater int(11),
    _fixTeamCost decimal(8, 5),
    _fixTeamDeposit decimal(8, 5)
    )
    BEGIN
     UPDATE events SET 
      name = _name,
      injured = _injured,
      visitors = _visitors,
      visitorLimit = _visitorLimit,
      playerCost = _playerCost,
      visitorCost = _visitorCost,
      playerDeposit = _playerDeposit,
      days = _days,
      startHour = _startHour,
      endHour = _endHour,
      length = _length,
      startDate = _startDate,
      lastUpdater = _updater,
      lastUpdate = NOW(),
      fixTeamCost = _fixTeamCost,
      fixTeamDeposit = _fixTeamDeposit
     WHERE id = _id;
    END;

  CREATE PROCEDURE getEventRoles(_event int(11))
    BEGIN
        SELECT * FROM eventroles WHERE event = _event;
     END;

  CREATE PROCEDURE addEventRole(_event int(11), _name varchar(50), _accessLevel int(1))
    BEGIN
        INSERT INTO eventroles(event, name, accessLevel)
        VALUES(_event, _name, _accessLevel);
     END;

  CREATE PROCEDURE updateEventRole(_id int(11), _name varchar(50), _accessLevel int(1))
    BEGIN
        UPDATE eventroles SET name = _name, accessLevel = _accessLevel WHERE id = _id;
     END;

  CREATE PROCEDURE deleteEventRole(_id int(11))
    BEGIN
        DELETE FROM eventroles WHERE id = _id;
     END;

  CREATE PROCEDURE getEventAccessLevel(_user int(11), _event int(11))
    BEGIN
     SELECT eventroles.accessLevel FROM eventroles
      INNER JOIN usereventswitch ON usereventswitch.role = eventroles.id
      INNER JOIN events ON usereventswitch.event = events.id
      WHERE usereventswitch.user = _user AND usereventswitch.event = _event AND NOT events.isDisabled;
    END;

  CREATE PROCEDURE countOfAllCost(_eventId int(11))
    BEGIN
     DECLARE _cost int(11) DEFAULT 0;
     DECLARE _deposit int(11) DEFAULT 0;
     SELECT COUNT(eventteammembers.id) INTO _cost FROM eventteammembers
      INNER JOIN eventteams ON eventteams.id = eventteammembers.team
      WHERE eventteams.event = _eventId AND eventteammembers.isPaidCost;
     SELECT COUNT(eventteammembers.id) INTO _deposit FROM eventteammembers
      INNER JOIN eventteams ON eventteams.id = eventteammembers.team
      WHERE eventteams.event = _eventId AND NOT eventteammembers.isPaidCost AND eventteammembers.isPaidDeposit;
     SELECT _cost AS countOfCosts, _deposit AS countOfDeposits;
    END;



  CREATE PROCEDURE setUnReadyEvent(_id int(11))
    BEGIN
      UPDATE events SET ready = FALSE WHERE id = _id;
    END;

  CREATE PROCEDURE setReadyEvent(_id int(11))
    BEGIN
      UPDATE events SET ready = TRUE WHERE id = _id;
    END;

  CREATE PROCEDURE setLockedEvent(_id int(11))
    BEGIN
     DECLARE _lock boolean;
     SELECT isLocked INTO _lock FROM events WHERE id = _id;

     IF _lock
      THEN
        SET _lock = FALSE;
      ELSE
        SET _lock = TRUE;
      END IF;
      UPDATE events SET isLocked = _lock WHERE id = _id;
    END;

  CREATE PROCEDURE increaseVisitors(_id int(11))
    BEGIN
      UPDATE events SET visitors = visitors + 1 WHERE id = _id;
    END;

  CREATE PROCEDURE decreaseVisitors(_id int(11))
    BEGIN
      UPDATE events SET visitors = visitors - 1 WHERE id = _id;
    END;

  CREATE PROCEDURE increaseInjured(_id int(11))
    BEGIN
      UPDATE events SET injured = injured + 1 WHERE id = _id;
    END;

  CREATE PROCEDURE decreaseInjured(_id int(11))
    BEGIN
      UPDATE events SET injured = injured - 1 WHERE id = _id;
    END;


  CREATE PROCEDURE addEventTodo(_eventId int(11), _text longtext, _importance int(1), _expDate datetime)
    BEGIN
      INSERT INTO eventtodoes (event, text, expirationDate, importance) VALUES (_eventId, _text, _expDate, _importance);
    END;

   CREATE PROCEDURE getEventTodoes(_eventId int(11))
    BEGIN
      SELECT * FROM eventtodoes WHERE event = _eventId
      ORDER BY isSolved, importance;
    END;

  CREATE PROCEDURE updateEventTodo(_todoId int(11), _text longtext, _importance int(11), _expDate date)
    BEGIN
      UPDATE eventtodoes SET text = _text, importance = _importance, expirationDate = _expDate WHERE id = _todoId;
    END;

  CREATE PROCEDURE setSolvedEventTodo(_todoId int(11))
    BEGIN
      UPDATE eventtodoes SET isSolved = TRUE WHERE id = _todoId;
    END;

   CREATE PROCEDURE getEventMessages(_eventId int(11))
    BEGIN
      SELECT eventmessages.id, eventmessages.sender AS senderId, eventmessages.event AS eventId, eventmessages.dateOfSent, eventmessages.message, users.name AS sender FROM eventmessages 
        INNER JOIN users ON eventmessages.sender = users.id
        WHERE event = _eventId
      ORDER BY dateOfSent;
    END;

  CREATE PROCEDURE addEventMessage(_eventId int(11), _text longtext, _sender int(11))
    BEGIN
      INSERT INTO eventmessages (event, message, sender) VALUES (_eventId, _text, _sender);
    END;

  /* eventmembers */

  CREATE PROCEDURE getEventMembers(_id int(11))
    BEGIN
     SELECT users.id, users.name, users.username, usereventswitch.role AS roleId, usereventswitch.connectionDate, usereventswitch.event, eventroles.accessLevel, eventroles.name AS role FROM users
      INNER JOIN usereventswitch ON users.id = usereventswitch.user
      INNER JOIN eventroles ON usereventswitch.role = eventroles.id
      WHERE usereventswitch.event = _id;
    END;

  CREATE PROCEDURE getEventLowWorkers(_id int(11))
    BEGIN
     SELECT users.id, users.name, eventroles.id AS roleId, eventroles.accessLevel, eventroles.name AS role, usereventswitch.connectionDate, usereventswitch.event FROM users
      INNER JOIN usereventswitch ON users.id = usereventswitch.user
      INNER JOIN eventroles ON usereventswitch.role = eventroles.id
       WHERE usereventswitch.event = _id AND eventroles.accessLevel = 1;
    END;

  CREATE PROCEDURE updateUserEvenetRole(_userId int(11), _eventId int(11), _roleId int(11))
    BEGIN 
        UPDATE usereventswitch SET role = _roleId WHERE user = _userId AND event = _eventId;
     END;

  CREATE PROCEDURE deleteUserFromEvent(_userId int(11), _eventId int(11))
    BEGIN
        DELETE FROM usereventswitch WHERE user = _userId AND event = _eventId;
        DELETE FROM eventworkertables WHERE worker = _userId AND event = _eventId;
        DELETE FROM eventworkworkerswitch WHERE worker = _userId;
     END;

  CREATE PROCEDURE addUserToEvent(_userId int(11), _eventId int(11), _role int(11))
    BEGIN
      DECLARE _days int(2);
      DECLARE _currentDay int(2) DEFAULT 0;
      DECLARE _startHour int(2);
      DECLARE _endHour int(11);
      DECLARE _workerId int(11) DEFAULT _userId;


      IF _role = 0
        THEN SET _role = 3;
      END IF;

     INSERT INTO usereventswitch(user, event, role)
      VALUES(_userId, _eventId, _role);

      SELECT days, startHour, endHour  INTO _days, _startHour, _endHour FROM events WHERE id = _eventId;

      WHILE _days <> _currentDay OR _startHour <> _endHour DO 
        INSERT INTO eventworkertables (day, hour, worker, event)
        VALUES (_currentDay, _startHour, _workerId, _eventId);

        SET _startHour = _startHour + 1;
        IF _startHour = 24
          THEN SET _startHour = 0;
          SET _currentDay = _currentDay + 1;
        END IF;
      END WHILE;

     INSERT INTO eventworkworkerswitch (work, worker)
       SELECT * FROM (
        SELECT eventworks.id FROM eventworks
        WHERE eventworks.event = _eventId) AS T1
    CROSS JOIN (SELECT _workerId) AS T2;

    CALL setUnReadyEvent(_eventId);
    END;
     
   CREATE PROCEDURE getNotMembers(_event int(11))
    BEGIN
      SELECT users.id, users.username, users.name, users.role AS roleId, roles.name AS role FROM users
        INNER JOIN roles ON users.role = roles.id 
      WHERE users.id NOT IN (
      SELECT user as id FROM usereventswitch
      WHERE event = _event
      ) AND NOT users.blocked AND roles.accessLevel <> 4;
    END;

  /* eventpayouttypes */

  CREATE PROCEDURE getPayOutTypes()
    BEGIN
     SELECT * FROM eventpayouttypes;
    END;

  CREATE PROCEDURE getPayOutType(_id int(11))
    BEGIN
     SELECT * FROM eventpayouttypes WHERE id = _id;
    END;

  /* evetpayouts */

  CREATE PROCEDURE getPayOuts(_eventId int(11))
    BEGIN
     SELECT eventpayouts.name, eventpayouts.id, eventpayouts.eventId, eventpayouts.cost, eventpayouts.type AS typeId, eventpayouttypes.name AS type, eventpayouttypes.isOut, eventpayouts.source, eventpayouts.destination FROM eventpayouts 
     INNER JOIN eventpayouttypes ON eventpayouts.type = eventpayouttypes.id
     WHERE eventpayouts.eventId = _eventId;
    END;

  CREATE PROCEDURE getPayOut(_id int(11))
    BEGIN
    SELECT  eventpayouts.name, eventpayouts.id, eventpayouts.eventId, eventpayouts.cost, eventpayouts.type AS typeId, eventpayouttypes.name AS type, eventpayouttypes.isOut, eventpayouts.source, eventpayouts.destination FROM eventpayouts 
     INNER JOIN eventpayouttypes ON eventpayouts.type = eventpayouttypes.id
     WHERE eventpayouts.id = _id;
    END;

  CREATE PROCEDURE addPayOut(_name varchar(75), _eventId int(11), _type int(11), _cost decimal, _source varchar(100), _destination varchar(100))
    BEGIN
     INSERT INTO eventpayouts (name, eventId, type, cost, source, destination)
        VALUES (_name, _eventId, _type, _cost, _source, _destination);
    END;

  CREATE PROCEDURE updatePayOut(_id int(11), _name varchar(75), _type int(11), _cost decimal, _source varchar(100), _destination varchar(100))
    BEGIN
     UPDATE eventpayouts SET name = _name, type = _type, cost = _cost, source = _source, destination = _destination WHERE id = _id;
    END;

  CREATE PROCEDURE deletePayOut(_id int(11))
    BEGIN
     DELETE FROM eventpayouts WHERE id = _id;
    END;

  /* Messages */

  CREATE PROCEDURE getMessages(_eventId int(11))
    BEGIN
     SELECT * FROM eventmessages WHERE event = _eventId ORDER BY dateOfSent LIMIT 200;
    END;

  CREATE PROCEDURE addMessage(_eventId int(11), _sender int(11), _message text)
    BEGIN
     INSERT INTO eventmessages (sender, event, message)
       VALUES (_sender, _eventId, _message);
    END;

  CREATE PROCEDURE deleteMessage(_id int(11))
    BEGIN
     DELETE FROM eventmessages WHERE id = _id;
    END;

  /* eventworks */

  CREATE PROCEDURE getWorks(_eventId int(11))
    BEGIN
     SELECT * FROM eventworks WHERE event = _eventId;
    END;

  CREATE PROCEDURE getWork(_id int(11))
    BEGIN
     SELECT * FROM eventworks WHERE id = _id;
    END;

  CREATE PROCEDURE deleteWork(_id int(11))
    BEGIN
    DECLARE _eventId int(11);
    SELECT event INTO _eventId FROM eventworks WHERE id = _id;
   /* DELETE FROM worktables WHERE work = _id;*/
    DELETE FROM eventworks WHERE id = _id;
    CALL setUnReadyEvent(_eventId);
    END;

  CREATE PROCEDURE addWork(_name varchar(50), _eventId int(11))
    BEGIN
      DECLARE _days int(2);
      DECLARE _currentDay int(2) DEFAULT 0;
      DECLARE _startHour int(2);
      DECLARE _endHour int(11);
      DECLARE _workId int(11);

       INSERT INTO eventworks (name, event)
        VALUES (_name, _eventId);

      SET _workId = LAST_INSERT_ID();

      SELECT days, startHour, endHour  INTO _days, _startHour, _endHour FROM events WHERE id = _eventId;

      WHILE _days <> _currentDay OR _startHour <> _endHour DO 
        INSERT INTO eventworktables (day, hour, work)
        VALUES (_currentDay, _startHour, _workId);

        SET _startHour = _startHour + 1;
        IF _startHour = 24
          THEN SET _startHour = 0;
          SET _currentDay = _currentDay + 1;
        END IF;
      END WHILE;

    INSERT INTO eventworkworkerswitch (worker, work)
       SELECT * FROM (
        SELECT users.id FROM users
        INNER JOIN usereventswitch ON users.id = usereventswitch.user
        WHERE usereventswitch.event = _eventId) AS T1
    CROSS JOIN (SELECT _workId) AS T2;

    CALL setUnReadyEvent(_eventId);
    END;

  /* eventworktables */

  CREATE PROCEDURE getWorkTables(_id int(11))
    BEGIN
     SELECT eventworktables.day, eventworktables.hour, eventworktables.work AS workId, eventworks.name AS work, eventworktables.isActive, eventworktables.worker AS workerId, users.name AS worker FROM eventworktables
      INNER JOIN eventworks ON eventworktables.work = eventworks.id
      LEFT JOIN users ON eventworktables.worker = users.id
    WHERE eventworktables.work = _id
    ORDER BY eventworktables.day, eventworktables.hour;
    END;

    CREATE PROCEDURE updateWorkTables(_workId int(11), _eventId int(11))
    BEGIN
      DECLARE _days int(2);
      DECLARE _currentDay int(2) DEFAULT 0;
      DECLARE _startHour int(2);
      DECLARE _endHour int(11);
      DELETE FROM eventworktables WHERE work = _workId;

       SELECT days, startHour, endHour  INTO _days, _startHour, _endHour FROM events WHERE id = _eventId;

      WHILE _days <> _currentDay OR _startHour <> _endHour DO 
        INSERT INTO eventworktables (day, hour, work)
        VALUES (_currentDay, _startHour, _workId);

        SET _startHour = _startHour + 1;
        IF _startHour = 24
          THEN SET _startHour = 0;
          SET _currentDay = _currentDay + 1;
        END IF;
      END WHILE;
    END;

    CREATE PROCEDURE updateWorkTable(_work int(11), _day int(2), _hour int(11), _worker int(11))
    BEGIN
      UPDATE eventworktables SET worker = _worker WHERE work = _work AND day = _day AND hour = _hour;
    END;

    CREATE PROCEDURE setWorkTableIsActive(_day int(2), _hour int(2), _work int(11))
    BEGIN
       DECLARE _eventId int(11);
     DECLARE _isActive boolean;
      SELECT event INTO _eventId FROM eventworks WHERE id = _work;
     SELECT isActive INTO _isActive FROM eventworktables WHERE day = _day AND hour = _hour AND work = _work;

     IF _isActive
      THEN
        SET _isActive = FALSE;
      ELSE
        SET _isActive = TRUE;
      END IF;
      UPDATE eventworktables SET isActive = _isActive WHERE day = _day AND hour = _hour AND work = _work;
      CALL setUnReadyEvent(_eventId);
    END;

    /* WorkerTables */

   CREATE PROCEDURE getWorkerTables(_id int(11), _eventId int(11))
    BEGIN
     SELECT eventworkertables.day, eventworkertables.hour, eventworkertables.work AS workId, eventworks.name AS work, eventworkertables.isAvaiable, eventworkertables.worker AS workerId, users.name AS worker FROM eventworkertables
      LEFT JOIN eventworks ON eventworkertables.work = eventworks.id
      INNER JOIN users ON eventworkertables.worker = users.id
    WHERE eventworkertables.worker = _id AND eventworkertables.event = _eventId
    ORDER BY eventworkertables.day, eventworkertables.hour;
    END;

    CREATE PROCEDURE updateWorkerTables(_workerId int(11), _eventId int(11))
    BEGIN
      DECLARE _days int(2);
      DECLARE _currentDay int(2) DEFAULT 0;
      DECLARE _startHour int(2);
      DECLARE _endHour int(11);
      DELETE FROM eventworkertables WHERE worker = _workerId AND event = _eventId;

      SELECT days, startHour, endHour  INTO _days, _startHour, _endHour FROM events WHERE id = _eventId;

      WHILE _days <> _currentDay OR _startHour <> _endHour DO 
        INSERT INTO eventworkertables (day, hour, worker, event)
        VALUES (_currentDay, _startHour, _workerId, _eventId);

        SET _startHour = _startHour + 1;
        IF _startHour = 24
          THEN SET _startHour = 0;
          SET _currentDay = _currentDay + 1;
        END IF;
      END WHILE;
      
    END;

    CREATE PROCEDURE updateWorkerTable(_worker int(11), _event int(11), _day int(2), _hour int(11), _work int(11))
    BEGIN
      UPDATE eventworkertables SET work = _work WHERE worker = _worker AND event = _event AND day = _day AND hour = _hour;
    END;

    CREATE PROCEDURE setWorkerTableIsAvaiable(_day int(2), _hour int(2), _worker int(11), _eventId int(11))
    BEGIN
     DECLARE _isAvaiable boolean;
     SELECT isAvaiable INTO _isAvaiable FROM eventworkertables WHERE day = _day AND hour = _hour AND worker = _worker AND event = _eventId;

     IF _isAvaiable
      THEN
        SET _isAvaiable = FALSE;
      ELSE
        SET _isAvaiable = TRUE;
      END IF;
      UPDATE eventworkertables SET isAvaiable = _isAvaiable WHERE day = _day AND hour = _hour AND worker = _worker AND event = _eventId;
      CALL setUnReadyEvent(_eventId);
    END;

    /* workworkerswitch */


CREATE PROCEDURE getWorkStatuses(_worker int(11), _event int(11))
    BEGIN
    SELECT users.id AS workerId, users.name AS worker, eventworks.id AS workId, eventworks.name AS work, eventworkworkerswitch.isValid FROM eventworkworkerswitch
      INNER JOIN users ON eventworkworkerswitch.worker = users.id
      INNER JOIN eventworks ON eventworkworkerswitch.work = eventworks.id
    WHERE eventworkworkerswitch.worker = _worker AND eventworks.event = _event;
    END;

CREATE PROCEDURE setIsValidWorkStatus(_work int(11), _worker int(11))
    BEGIN
      DECLARE _eventId int(11);
     DECLARE _isValid boolean;
      SELECT event INTO _eventId FROM eventworks WHERE id = _work;
     SELECT isValid INTO _isValid FROM eventworkworkerswitch WHERE work = _work AND worker = _worker;

     IF _isValid
      THEN
        SET _isValid = FALSE;
      ELSE
        SET _isValid = TRUE;
      END IF;
      UPDATE eventworkworkerswitch SET isValid = _isValid  WHERE work = _work AND worker = _worker;
  CALL setUnReadyEvent(_eventId);
  END;

/* eventteams */

DROP PROCEDURE getEventTeams;
CREATE PROCEDURE getEventTeams(_event int(11))
    BEGIN
      SELECT eventteams.id, eventteams.name, eventteams.event, eventteams.members, eventteams.creationDate, eventteams.hasResponsibilityPaper, eventteams.teamLeader AS teamLeaderId, eventteammembers.name AS teamLeader, eventteams.isPaidFixCost, eventteams.isPaidFixDeposit FROM eventteams
        LEFT JOIN eventteammembers ON eventteammembers.id = eventteams.teamLeader
      WHERE event = _event;
    END;

CREATE PROCEDURE deleteEventTeam(_teamId int(11))
    BEGIN
      DELETE FROM eventteams WHERE id = _teamId;
    END;

CREATE PROCEDURE updateEventTeam(_teamId int(11), _name varchar(100))
    BEGIN
      UPDATE eventteams SET name = _name WHERE id = _teamId;
    END;

CREATE PROCEDURE addEventTeam(_eventId int(11), _name varchar(100))
    BEGIN
      INSERT INTO eventteams (name, event)
        VALUES (_name, _eventId);
      SELECT LAST_INSERT_ID() As id;
    END;

DROP PROCEDURE setEventTeamIsPaidFixCostStatus;
CREATE PROCEDURE setEventTeamIsPaidFixCostStatus(_eventteam int(11), _status boolean)
    BEGIN
       UPDATE eventteams SET isPaidFixCost = _status WHERE id = _eventteam;
    END;

DROP PROCEDURE setEventTeamIsPaidFixDepositStatus;
CREATE PROCEDURE setEventTeamIsPaidFixDepositStatus(_eventteam int(11), _status boolean)
    BEGIN
       UPDATE eventteams SET isPaidFixDeposit = _status WHERE id = _eventteam;
    END;

CREATE PROCEDURE setHasResponsibilityPaper(_teamId int(11))
    BEGIN
      DECLARE responsibility int(11);

     SELECT hasResponsibilityPaper INTO responsibility FROM eventteams WHERE id = _teamId;

     IF responsibility
      THEN
        SET responsibility = FALSE;
      ELSE
        SET responsibility = TRUE;
      END IF;
      UPDATE eventteams SET hasResponsibilityPaper = responsibility  WHERE id = _teamId;
  END;

CREATE PROCEDURE setTeamMemberToTeamLeader(_teamId int(11), _memberId int(11))
    BEGIN
      UPDATE eventteams SET teamLeader = _memberId WHERE id = _teamId;
  END;

DROP PROCEDURE getCountOfFixCostsAndDeposits;
CREATE PROCEDURE getCountOfFixCostsAndDeposits(_event int(11))
    BEGIN
       DECLARE costs int(11) DEFAULT 0;
       DECLARE deposits int(11) DEFAULT 0;

       SELECT COUNT(id) INTO costs FROM eventteams WHERE event = _event AND isPaidFixCost;
       SELECT COUNT(id) INTO deposits FROM eventteams WHERE event = _event AND isPaidFixDeposit AND NOT isPaidFixCost;

       SELECT costs AS countOfCost, deposits AS countOfDeposit;
    END;

  
    
CREATE PROCEDURE getEventTeamMembers(_teamId int(11))
    BEGIN
      SELECT * FROM eventteammembers
      WHERE team = _teamId;
    END;

CREATE PROCEDURE deleteEventTeamMember(_teammemberId int(11))
    BEGIN
      DELETE FROM eventteammembers WHERE id = _teammemberId;
    END;

CREATE PROCEDURE addEventTeamMember(_teamId int(11), _name varchar(100))
    BEGIN
      INSERT INTO eventteammembers (name, team)
  VALUES (_name, _teamId);
    END;
    
 CREATE PROCEDURE setTeamMemberCostStatus(_teammemberId int(11))
    BEGIN
     DECLARE _isPaid boolean;
     SELECT isPaidCost INTO _isPaid FROM eventteammembers WHERE id = _teammemberId;

     IF _isPaid
      THEN
        SET _isPaid = FALSE;
      ELSE
        SET _isPaid = TRUE;
      END IF;
      UPDATE eventteammembers SET isPaidCost = _isPaid WHERE id = _teammemberId;
      UPDATE eventteammembers SET isPaidDeposit = _isPaid WHERE id = _teammemberId;
    END;
    
    CREATE PROCEDURE setTeamMemberDepositStatus(_teammemberId int(11))
    BEGIN
     DECLARE _isPaid boolean;
     SELECT isPaidDeposit INTO _isPaid FROM eventteammembers WHERE id = _teammemberId;

     IF _isPaid
      THEN
        SET _isPaid = FALSE;
      ELSE
        SET _isPaid = TRUE;
      END IF;
      UPDATE eventteammembers SET isPaidDeposit = _isPaid WHERE id = _teammemberId;
    END;
    
   CREATE PROCEDURE countOfCostAndDeposit(_teamId int(11))
    BEGIN
     DECLARE _paid int(10) DEFAULT 0;
     DECLARE _deposit int(10) DEFAULT 0;

     SELECT COUNT(id) INTO _paid FROM eventteammembers WHERE team = _teamId AND isPaidCost;
     SELECT COUNT(id) INTO _deposit FROM eventteammembers WHERE team = _teamId AND isPaidDeposit;

      SELECT _paid AS countOfCost, _deposit AS countOfDeposit;
    END;