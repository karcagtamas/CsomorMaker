USE csomormaker;
/* Roles */

  CREATE OR REPLACE PROCEDURE getRoles()
    BEGIN
      SELECT * FROM roles;
    END;

  CREATE OR REPLACE PROCEDURE deleteRole(_id int(11))
    BEGIN
      DELETE FROM roles WHERE roles.id = _id;
    END;

  CREATE OR REPLACE PROCEDURE getRole(_id int(11))
    BEGIN
      SELECT * FROM roles WHERE roles.id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addRole(_name varchar(100))
    BEGIN
      INSERT INTO roles (name)
      VALUES (_name);
    END;

/* eventmembers */

  CREATE OR REPLACE PROCEDURE getEventMembers(_id int(11))
    BEGIN
     SELECT users.id, users.name, users.username, usereventswitch.role AS roleId, usereventswitch.connectionDate, usereventswitch.event, eventroles.accessLevel, eventroles.name AS role FROM users
      INNER JOIN usereventswitch ON users.id = usereventswitch.user
      INNER JOIN eventroles ON usereventswitch.role = eventroles.id
      WHERE usereventswitch.event = _id;
    END;

  CALL getEventMembers(2);

  CREATE OR REPLACE PROCEDURE getEventLowWorkers(_id int(11))
    BEGIN
     SELECT users.id, users.name, eventroles.id AS roleId, eventroles.accessLevel, eventroles.name AS role, usereventswitch.connectionDate, usereventswitch.event FROM users
      INNER JOIN usereventswitch ON users.id = usereventswitch.user
      INNER JOIN eventroles ON usereventswitch.role = eventroles.id
       WHERE usereventswitch.event = _id AND eventroles.accessLevel = 1;
    END;

  CALL getEventLowWorkers(2);

  CREATE OR REPLACE PROCEDURE updateUserEvenetRole(_userId int(11), _eventId int(11), _roleId int(11))
    BEGIN 
        UPDATE usereventswitch SET role = _roleId WHERE user = _userId AND event = _eventId;
     END;

  CREATE OR REPLACE PROCEDURE deleteUserFromEvent(_userId int(11), _eventId int(11))
    BEGIN
        DELETE FROM usereventswitch WHERE user = _userId AND event = _eventId;
        DELETE FROM eventworkertables WHERE worker = _userId AND event = _eventId;
        DELETE FROM eventworkworkerswitch WHERE worker = _userId;
     END;

  CREATE OR REPLACE PROCEDURE addUserToEvent(_userId int(11), _eventId int(11), _role int(11))
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
        SELECT works.id FROM works
        WHERE works.event = _eventId) AS T1
    CROSS JOIN (SELECT _workerId) AS T2;

    CALL setUnReadyEvent(_eventId);
    END;
     
   CREATE OR REPLACE PROCEDURE getNotMembers(_event int(11))
    BEGIN
      SELECT users.id, users.username, users.name, users.role AS roleId, roles.name AS role FROM users
        INNER JOIN roles ON users.role = roles.id 
      WHERE users.id NOT IN (
      SELECT user as id FROM usereventswitch
      WHERE event = _event
      );
    END;

  /* eventpayouttypes */

  CREATE OR REPLACE PROCEDURE getPayOutTypes()
    BEGIN
     SELECT * FROM eventpayouttypes;
    END;

  CREATE OR REPLACE PROCEDURE getPayOutType(_id int(11))
    BEGIN
     SELECT * FROM eventpayouttypes WHERE id = _id;
    END;

  /* evetpayouts */

  CREATE OR REPLACE PROCEDURE getPayOuts(_eventId int(11))
    BEGIN
     SELECT eventpayouts.name, eventpayouts.id, eventpayouts.eventId, eventpayouts.cost, eventpayouts.type AS typeId, eventpayouttypes.name AS type, eventpayouttypes.isOut FROM eventpayouts 
     INNER JOIN eventpayouttypes ON eventpayouts.type = eventpayouttypes.id
     WHERE eventpayouts.eventId = _eventId;
    END;

  CREATE OR REPLACE PROCEDURE getPayOut(_id int(11))
    BEGIN
    SELECT  eventpayouts.name, eventpayouts.id, eventpayouts.eventId, eventpayouts.cost, eventpayouts.type AS typeId, eventpayouttypes.name AS type, eventpayouttypes.isOu FROM eventpayouts 
     INNER JOIN eventpayouttypes ON eventpayouts.type = eventpayouttypes.id
     WHERE eventpayouts.id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addPayOut(_name varchar(75), _eventId int(11), _type int(11), _cost decimal)
    BEGIN
     INSERT INTO eventpayouts (name, eventId, type, cost)
        VALUES (_name, _eventId, _type, _cost);
    END;

  CREATE OR REPLACE PROCEDURE deletePayOut(_id int(11))
    BEGIN
     DELETE FROM eventpayouts WHERE id = _id;
    END;

  /* eventtodoes */

  CREATE OR REPLACE PROCEDURE getToDoes(_eventId int(11))
    BEGIN
     SELECT * FROM eventtodoes WHERE eventId = _eventId;
    END;

  CREATE OR REPLACE PROCEDURE getToDo(_id int(11))
    BEGIN
     SELECT * FROM eventtodoes WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addToDo(_eventId int(11), _text longtext)
    BEGIN
     INSERT INTO eventtodoes (eventId, text)
        VALUES (_eventId, _text);
    END;

  CREATE OR REPLACE PROCEDURE deleteToDo(_id int(11))
    BEGIN
     DELETE FROM eventtodoes WHERE id = _id;
    END;

  /* Messages */

  CREATE OR REPLACE PROCEDURE getMessages(_eventId int(11))
    BEGIN
     SELECT * FROM eventmessages WHERE event = _eventId ORDER BY dateOfSent;
    END;

  CREATE OR REPLACE PROCEDURE addMessage(_eventId int(11), _sender int(11), _message text)
    BEGIN
     INSERT INTO eventmessages (sender, event, message)
       VALUES (_sender, _eventId, _message);
    END;

  CREATE OR REPLACE PROCEDURE deleteMessage(_id int(11))
    BEGIN
     DELETE FROM eventmessages WHERE id = _id;
    END;

  /* eventworks */

  CREATE OR REPLACE PROCEDURE getWorks(_eventId int(11))
    BEGIN
     SELECT * FROM eventworks WHERE event = _eventId;
    END;

  CREATE OR REPLACE PROCEDURE getWork(_id int(11))
    BEGIN
     SELECT * FROM eventworks WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE deleteWork(_id int(11))
    BEGIN
    DECLARE _eventId int(11);
    SELECT event INTO _eventId FROM eventworks WHERE id = _id;
   /* DELETE FROM worktables WHERE work = _id;*/
    DELETE FROM eventworks WHERE id = _id;
    CALL setUnReadyEvent(_eventId);
    END;

  CREATE OR REPLACE PROCEDURE addWork(_name varchar(50), _eventId int(11))
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

  CREATE OR REPLACE PROCEDURE getWorkTables(_id int(11))
    BEGIN
     SELECT eventworktables.day, eventworktables.hour, eventworktables.work AS workId, eventworks.name AS work, eventworktables.isActive, eventworktables.worker AS workerId, users.name AS worker FROM eventworktables
      INNER JOIN eventworks ON eventworktables.work = eventworks.id
      LEFT JOIN users ON eventworktables.worker = users.id
    WHERE eventworktables.work = _id
    ORDER BY eventworktables.day, eventworktables.hour;
    END;

    CREATE OR REPLACE PROCEDURE updateWorkTables(_workId int(11), _eventId int(11))
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

    CREATE OR REPLACE PROCEDURE updateWorkTable(_work int(11), _day int(2), _hour int(11), _worker int(11))
    BEGIN
      UPDATE eventworktables SET worker = _worker WHERE work = _work AND day = _day AND hour = _hour;
    END;

    CREATE OR REPLACE PROCEDURE setWorkTableIsActive(_day int(2), _hour int(2), _work int(11))
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

   CREATE OR REPLACE PROCEDURE getWorkerTables(_id int(11), _eventId int(11))
    BEGIN
     SELECT eventworkertables.day, eventworkertables.hour, eventworkertables.work AS workId, eventworks.name AS work, eventworkertables.isAvaiable, eventworkertables.worker AS workerId, users.name AS worker FROM eventworkertables
      LEFT JOIN eventworks ON eventworkertables.work = eventworks.id
      INNER JOIN users ON eventworkertables.worker = users.id
    WHERE eventworkertables.worker = _id AND eventworkertables.event = _eventId
    ORDER BY eventworkertables.day, eventworkertables.hour;
    END;

    CREATE OR REPLACE PROCEDURE updateWorkerTables(_workerId int(11), _eventId int(11))
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

    CREATE OR REPLACE PROCEDURE updateWorkerTable(_worker int(11), _event int(11), _day int(2), _hour int(11), _work int(11))
    BEGIN
      UPDATE eventworkertables SET work = _work WHERE worker = _worker AND event = _event AND day = _day AND hour = _hour;
    END;

    CREATE OR REPLACE PROCEDURE setWorkerTableIsAvaiable(_day int(2), _hour int(2), _worker int(11), _eventId int(11))
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


CREATE OR REPLACE PROCEDURE getWorkStatuses(_worker int(11), _event int(11))
    BEGIN
    SELECT users.id AS workerId, users.name AS worker, eventworks.id AS workId, eventworks.name AS work, eventworkworkerswitch.isValid FROM eventworkworkerswitch
      INNER JOIN users ON eventworkworkerswitch.worker = users.id
      INNER JOIN eventworks ON eventworkworkerswitch.work = eventworks.id
    WHERE eventworkworkerswitch.worker = _worker AND eventworks.event = _event;
    END;

CREATE OR REPLACE PROCEDURE setIsValidWorkStatus(_work int(11), _worker int(11))
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

CREATE OR REPLACE PROCEDURE getEventTeams(_event int(11))
    BEGIN
      SELECT * FROM eventteams
      WHERE event = _event;
    END;

CREATE OR REPLACE PROCEDURE deleteEventTeam(_teamId int(11))
    BEGIN
      DELETE FROM eventteams WHERE id = _teamId;
    END;

CREATE OR REPLACE PROCEDURE updateEventTeam(_teamId int(11), _name varchar(100))
    BEGIN
      UPDATE eventteams SET name = _name WHERE id = _teamId;
    END;

  
    
CREATE OR REPLACE PROCEDURE getEventTeamMembers(_teamId int(11))
    BEGIN
      SELECT * FROM eventteammembers
      WHERE team = _teamId;
    END;

CREATE OR REPLACE PROCEDURE deleteEventTeamMember(_teammemberId int(11))
    BEGIN
      DELETE FROM eventteammembers WHERE id = _teammemberId;
    END;
    
 CREATE OR REPLACE PROCEDURE setTeamMemberCostStatus(_teammemberId int(11))
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
    END;
    
    CREATE OR REPLACE PROCEDURE setTeamMemberDepositStatus(_teammemberId int(11))
    BEGIN
     DECLARE _isPaid boolean;
     SELECT isPaidDeposit INTO _isPaid FROM teammembers WHERE id = _teammemberId;

     IF _isPaid
      THEN
        SET _isPaid = FALSE;
      ELSE
        SET _isPaid = TRUE;
      END IF;
      UPDATE teammembers SET isPaidDeposit = _isPaid WHERE id = _teammemberId;
    END;
    




   
