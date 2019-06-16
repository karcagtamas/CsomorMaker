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

/* Events */

  CREATE OR REPLACE PROCEDURE getEvents()
    BEGIN
     SELECT * FROM events
      WHERE NOT isDisabled;
    END;

  CREATE OR REPLACE PROCEDURE getUsersEvents(_userId int(11))
    BEGIN
     SELECT events.id, 
      events.name,
      events.isLocked, 
      events.isDisabled, 
      events.currentPlayers, 
      events.playerLimit, 
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
      users.name AS creater FROM events
      INNER JOIN usereventswitch ON events.id = usereventswitch.event
      INNER JOIN users ON events.creater = users.id
      WHERE NOT events.isDisabled AND user = _userId;
    END;

  CREATE OR REPLACE PROCEDURE getEvent(_id int(11))
    BEGIN
     SELECT events.id, 
      events.name,
      events.isLocked, 
      events.isDisabled, 
      events.currentPlayers, 
      events.playerLimit, 
      events.injured, 
      events.visitors, 
      events.visitorLimit, 
      events.playerCost, 
      events.visitorCost, 
      EVENTS.playerDeposit, 
      events.days, 
      events.startHour, 
      events.endHour, 
      events.length, 
      events.ready, 
      events.creationDate,
      events.members,
      events.creater AS createId, 
      users.name AS creater FROM events
      INNER JOIN users ON events.creater = users.id
      WHERE NOT events.isDisabled AND events.id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addEvent(_name varchar(50), _creater int(11))
    BEGIN
     INSERT INTO events (name, creater)
      VALUES (_name, _creater);

     CALL addUserToEvent(_creater, LAST_INSERT_ID(), 1);
    END;

  CREATE OR REPLACE PROCEDURE disableEvent(_id int(11))
    BEGIN
     UPDATE events SET isDisabled = TRUE WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE updateEvent(
    _id int(11),
    _name varchar(50),
    _currentPlayers int(11),
    _playerLimit int(11),
    _injured int(11),
    _visitors int(11),
    _visitorLimit int(11),
    _playerCost decimal,
    _visitorCost decimal,
    _playerDeposit decimal,
    _days int(2),
    _startHour int(2),
    _endHour int(2),
    _length int(4)
    )
    BEGIN
     UPDATE events SET 
      name = _name,
      currentPlayers = _currentPlayers,
      playerLimit = _playerLimit,
      injured = _injured,
      visitors = _visitors,
      visitorLimit = _visitorLimit,
      playerCost = _playerCost,
      visitorCost = _visitorCost,
      playerDeposit = _playerDeposit,
      days = _days,
      startHour = _startHour,
      endHour = _endHour,
      length = _length 
     WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE setReadyEvent(_id int(11))
    BEGIN
     DECLARE _ready boolean;
     SELECT ready INTO _ready FROM events WHERE id = _id;

     IF _ready
      THEN
        SET _ready = FALSE;
      ELSE
        SET _ready = TRUE;
      END IF;
      UPDATE events SET ready = _ready WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE setLockedEvent(_id int(11))
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

  CREATE OR REPLACE PROCEDURE increaseVisitors(_id int(11))
    BEGIN
      UPDATE events SET visitors = visitors + 1 WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE decreaseVisitors(_id int(11))
    BEGIN
      UPDATE events SET visitors = visitors - 1 WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE increaseInjured(_id int(11))
    BEGIN
      UPDATE events SET injured = injured + 1 WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE decreaseInjured(_id int(11))
    BEGIN
      UPDATE events SET injured = injured - 1 WHERE id = _id;
    END;


  CREATE OR REPLACE PROCEDURE getEventMembers(_id int(11))
    BEGIN
     SELECT users.id, users.name, usereventswitch.role AS roleId, usereventswitch.connectionDate, usereventswitch.event, eventroles.accessLevel, eventroles.name AS role FROM users
      INNER JOIN usereventswitch ON users.id = usereventswitch.user
      INNER JOIN eventroles ON usereventswitch.role = eventroles.id
      WHERE usereventswitch.event = _id;
    END;

     CREATE OR REPLACE PROCEDURE getEventLowWorkers(_id int(11))
    BEGIN
     SELECT users.id, users.name, eventroles.id AS roleId, eventroles.accessLevel, eventroles.name AS role, usereventswitch.connectionDate, usereventswitch.event FROM users
      INNER JOIN usereventswitch ON users.id = usereventswitch.user
      INNER JOIN eventroles ON usereventswitch.role = eventroles.id
       WHERE usereventswitch.event = _id AND eventroles.accessLevel = 1;
    END;


  /* Users */

  CREATE OR REPLACE PROCEDURE getHash(_username varchar(50))
    BEGIN
      SELECT password AS hash, id AS userId FROM users
        WHERE username = _username;
    END;
  
  CREATE OR REPLACE PROCEDURE isAdmin(_userId int(11))
    BEGIN
      DECLARE level int(1);
      DECLARE roleId int(11);
      SELECT role INTO roleId FROM users WHERE id = _userId;
      SELECT accessLevel INTO level FROM roles WHERE id = roleId;
      IF level = 3
        THEN SELECT TRUE AS isAdmin;
        ELSE SELECT FALSE AS isAdmin;
        END IF;
    END;

  CREATE OR REPLACE PROCEDURE getUsers()
    BEGIN
     SELECT * FROM users;
    END;

  CREATE OR REPLACE PROCEDURE getUser(_id int(11))
    BEGIN
     SELECT * FROM users WHERE id = _id;
    END;


  CREATE OR REPLACE PROCEDURE updateUser(_id int(11), _name varchar(100))
    BEGIN
     UPDATE users SET name = _name WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE deleteUser(_id int(11))
    BEGIN
     DELETE FROM users WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addUser(_username varchar(100), _email varchar(255), _password varchar(100))
    BEGIN
     INSERT INTO users(username, email, name, password)
      VALUES(_username, _email, _email, _password);
    END;

  CREATE OR REPLACE PROCEDURE deleteUserFromEvent(_userId int(11), _eventId int(11))
    BEGIN
        DELETE FROM usereventswitch WHERE user = _userId AND event = _eventId;
        DELETE FROM workertables WHERE worker = _userId AND event = _eventId;
        DELETE FROM workworkerswitch WHERE worker = _userId;
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
        INSERT INTO workertables (day, hour, worker, event)
        VALUES (_currentDay, _startHour, _workerId, _eventId);

        SET _startHour = _startHour + 1;
        IF _startHour = 24
          THEN SET _startHour = 0;
          SET _currentDay = _currentDay + 1;
        END IF;
      END WHILE;

     INSERT INTO workworkerswitch (work, worker)
       SELECT * FROM (
        SELECT works.id FROM works
        WHERE works.event = _eventId) AS T1
    CROSS JOIN (SELECT _workerId) AS T2;
    END;

  /* Payout types */

  CREATE OR REPLACE PROCEDURE getPayOutTypes()
    BEGIN
     SELECT * FROM payouttypes;
    END;

  CREATE OR REPLACE PROCEDURE getPayOutType(_id int(11))
    BEGIN
     SELECT * FROM payouttypes WHERE id = _id;
    END;

  /* Payouts */

  CREATE OR REPLACE PROCEDURE getPayOuts(_eventId int(11))
    BEGIN
     SELECT payouts.name, payouts.id, payouts.eventId, payouts.cost, payouts.type AS typeId, payouttypes.name AS type, payouttypes.isOut FROM payouts 
     INNER JOIN payouttypes ON payouts.type = payouttypes.id
     WHERE payouts.eventId = _eventId;
    END;

  CREATE OR REPLACE PROCEDURE getPayOut(_id int(11))
    BEGIN
    SELECT  payouts.name, payouts.id, payouts.eventId, payouts.cost, payouts.type AS typeId, payouttypes.name AS type, payouttypes.isOu FROM payouts 
     INNER JOIN payouttypes ON payouts.type = payouttypes.id
     WHERE payouts.id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addPayOut(_name varchar(75), _eventId int(11), _type int(11), _cost decimal)
    BEGIN
     INSERT INTO payouts (name, eventId, type, cost)
        VALUES (_name, _eventId, _type, _cost);
    END;

  CREATE OR REPLACE PROCEDURE deletePayOut(_id int(11))
    BEGIN
     DELETE FROM payouts WHERE id = _id;
    END;

  /* Todoes */

  CREATE OR REPLACE PROCEDURE getToDoes(_eventId int(11))
    BEGIN
     SELECT * FROM todoes WHERE eventId = _eventId;
    END;

  CREATE OR REPLACE PROCEDURE getToDo(_id int(11))
    BEGIN
     SELECT * FROM todoes WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addToDo(_eventId int(11), _text longtext)
    BEGIN
     INSERT INTO todoes (eventId, text)
        VALUES (_eventId, _text);
    END;

  CREATE OR REPLACE PROCEDURE deleteToDo(_id int(11))
    BEGIN
     DELETE FROM todoes WHERE id = _id;
    END;

  /* Messages */

  CREATE OR REPLACE PROCEDURE getMessages(_eventId int(11))
    BEGIN
     SELECT * FROM messages WHERE event = _eventId ORDER BY dateOfSent;
    END;

  CREATE OR REPLACE PROCEDURE addMessage(_eventId int(11), _sender int(11), _message text)
    BEGIN
     INSERT INTO messages (sender, event, message)
       VALUES (_sender, _eventId, _message);
    END;

  CREATE OR REPLACE PROCEDURE deleteMessage(_id int(11))
    BEGIN
     DELETE FROM messages WHERE id = _id;
    END;

  /* Works */

  CREATE OR REPLACE PROCEDURE getWorks(_eventId int(11))
    BEGIN
     SELECT * FROM works WHERE event = _eventId;
    END;

  CREATE OR REPLACE PROCEDURE getWork(_id int(11))
    BEGIN
     SELECT * FROM works WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE deleteWork(_id int(11))
    BEGIN
   /* DELETE FROM worktables WHERE work = _id;*/
    DELETE FROM works WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addWork(_name varchar(50), _eventId int(11))
    BEGIN
      DECLARE _days int(2);
      DECLARE _currentDay int(2) DEFAULT 0;
      DECLARE _startHour int(2);
      DECLARE _endHour int(11);
      DECLARE _workId int(11);

       INSERT INTO works (name, event)
        VALUES (_name, _eventId);

      SET _workId = LAST_INSERT_ID();

      SELECT days, startHour, endHour  INTO _days, _startHour, _endHour FROM events WHERE id = _eventId;

      WHILE _days <> _currentDay OR _startHour <> _endHour DO 
        INSERT INTO worktables (day, hour, work)
        VALUES (_currentDay, _startHour, _workId);

        SET _startHour = _startHour + 1;
        IF _startHour = 24
          THEN SET _startHour = 0;
          SET _currentDay = _currentDay + 1;
        END IF;
      END WHILE;

    INSERT INTO workworkerswitch (worker, work)
       SELECT * FROM (
        SELECT users.id FROM users
        INNER JOIN usereventswitch ON users.id = usereventswitch.user
        WHERE usereventswitch.event = _eventId) AS T1
    CROSS JOIN (SELECT _workId) AS T2;
    END;

  /* Work Tables */

  CREATE OR REPLACE PROCEDURE getWorkTablesWithWorkerNames(_id int(11))
    BEGIN
     SELECT worktables.day, worktables.hour, worktables.work AS workId, works.name AS work, worktables.isActive, worktables.worker AS workerId, users.name AS worker FROM worktables
      INNER JOIN works ON worktables.work = works.id
      INNER JOIN users ON worktables.worker = users.id
    WHERE worktables.work = _id
    ORDER BY worktables.day, worktables.hour;
    END;

    CREATE OR REPLACE PROCEDURE getWorkTablesWithoutWorkerNames(_id int(11))
    BEGIN
     SELECT worktables.day, worktables.hour, worktables.work AS workId, works.name AS work, worktables.isActive, worktables.worker AS workerId FROM worktables
      INNER JOIN works ON worktables.work = works.id
    WHERE worktables.work = _id
    ORDER BY worktables.day, worktables.hour;
    END;

    CREATE OR REPLACE PROCEDURE updateWorkTables(_workId int(11), _eventId int(11))
    BEGIN
      DECLARE _days int(2);
      DECLARE _currentDay int(2) DEFAULT 0;
      DECLARE _startHour int(2);
      DECLARE _endHour int(11);
      DELETE FROM worktables WHERE work = _workId;

       SELECT days, startHour, endHour  INTO _days, _startHour, _endHour FROM events WHERE id = _eventId;

      WHILE _days <> _currentDay OR _startHour <> _endHour DO 
        INSERT INTO worktables (day, hour, work)
        VALUES (_currentDay, _startHour, _workId);

        SET _startHour = _startHour + 1;
        IF _startHour = 24
          THEN SET _startHour = 0;
          SET _currentDay = _currentDay + 1;
        END IF;
      END WHILE;
      
    END;

    CREATE OR REPLACE PROCEDURE setWorkTableIsActive(_day int(2), _hour int(2), _work int(11))
    BEGIN
     DECLARE _isActive boolean;
     SELECT isActive INTO _isActive FROM worktables WHERE day = _day AND hour = _hour AND work = _work;

     IF _isActive
      THEN
        SET _isActive = FALSE;
      ELSE
        SET _isActive = TRUE;
      END IF;
      UPDATE worktables SET isActive = _isActive WHERE day = _day AND hour = _hour AND work = _work;
    END;

    /* WorkerTables */

   CREATE OR REPLACE PROCEDURE getWorkerTablesWithWorkNames(_id int(11), _eventId int(11))
    BEGIN
     SELECT workertables.day, workertables.hour, workertables.work AS workId, works.name AS work, workertables.isAvaiable, workertables.worker AS workerId, users.name AS worker FROM workertables
      INNER JOIN works ON workertables.work = works.id
      INNER JOIN users ON workertables.worker = users.id
    WHERE workertables.worker = _id AND workertables.event = _eventId
    ORDER BY workertables.day, workertables.hour;
    END;

    CREATE OR REPLACE PROCEDURE getWorkerTablesWithoutWorkNames(_id int(11), _eventId int(11))
    BEGIN
     SELECT workertables.day, workertables.hour, workertables.work AS workId, workertables.isAvaiable, workertables.worker AS workerId, users.name AS worker FROM workertables
      INNER JOIN users ON workertables.worker = users.id
    WHERE workertables.worker = _id AND workertables.event = _eventId
    ORDER BY workertables.day, workertables.hour;
    END;

    CREATE OR REPLACE PROCEDURE updateWorkerTables(_workerId int(11), _eventId int(11))
    BEGIN
      DECLARE _days int(2);
      DECLARE _currentDay int(2) DEFAULT 0;
      DECLARE _startHour int(2);
      DECLARE _endHour int(11);
      DELETE FROM workertables WHERE worker = _workerId AND event = _eventId;

      SELECT days, startHour, endHour  INTO _days, _startHour, _endHour FROM events WHERE id = _eventId;

      WHILE _days <> _currentDay OR _startHour <> _endHour DO 
        INSERT INTO workertables (day, hour, worker, event)
        VALUES (_currentDay, _startHour, _workerId, _eventId);

        SET _startHour = _startHour + 1;
        IF _startHour = 24
          THEN SET _startHour = 0;
          SET _currentDay = _currentDay + 1;
        END IF;
      END WHILE;
      
    END;

    CREATE OR REPLACE PROCEDURE setWorkerTableIsAvaiable(_day int(2), _hour int(2), _worker int(11), _eventId int(11))
    BEGIN
     DECLARE _isAvaiable boolean;
     SELECT isAvaiable INTO _isAvaiable FROM workertables WHERE day = _day AND hour = _hour AND worker = _worker AND event = _eventId;

     IF _isAvaiable
      THEN
        SET _isAvaiable = FALSE;
      ELSE
        SET _isAvaiable = TRUE;
      END IF;
      UPDATE workertables SET isAvaiable = _isAvaiable WHERE day = _day AND hour = _hour AND worker = _worker AND event = _eventId;
    END;


CALL getWorkerTablesWithoutWorkNames(1, 2);

  /* CALL getWorkTablesWithoutWorkerNames(1); */
 /* CALL addWork('Portás', 1); */


   