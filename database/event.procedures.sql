USE csomormaker;

CREATE OR REPLACE PROCEDURE disableEvent(_eventId int(11))
    BEGIN
        UPDATE events SET isDisabled = TRUE WHERE id = _eventId;
    END;

CREATE OR REPLACE PROCEDURE getEvents()
    BEGIN
        SELECT *
        FROM events
        WHERE NOT isDisabled;
    END;

CREATE OR REPLACE PROCEDURE getEvent(_id int(11))
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
      events.startDate FROM events
      INNER JOIN users ON events.creater = users.id
      WHERE NOT events.isDisabled AND events.id = _id;
    END;

CREATE OR REPLACE PROCEDURE getUsersEvents(_userId int(11))
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
      events.startDate FROM events
      INNER JOIN usereventswitch ON events.id = usereventswitch.event
      INNER JOIN users ON events.creater = users.id
      WHERE NOT events.isDisabled AND user = _userId;
    END;

CREATE OR REPLACE PROCEDURE addEvent(_name varchar(50), _creater int(11))
    BEGIN
     INSERT INTO events (name, creater)
      VALUES (_name, _creater);

     CALL addUserToEvent(_creater, LAST_INSERT_ID(), 1);
    END;

CREATE OR REPLACE PROCEDURE updateEvent(
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
    _startDate date
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
      startDate = _startDate
     WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE getEventRoles()
    BEGIN
        SELECT * FROM eventroles;
     END;

  CREATE OR REPLACE PROCEDURE getEventAccessLevel(_user int(11), _event int(11))
    BEGIN
     SELECT eventroles.accessLevel FROM eventroles
      INNER JOIN usereventswitch ON usereventswitch.role = eventroles.id
      INNER JOIN events ON usereventswitch.event = events.id
      WHERE usereventswitch.user = _user AND usereventswitch.event = _event AND NOT events.isDisabled;
    END;

  CREATE OR REPLACE PROCEDURE countOfAllCost(_eventId int(11))
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


  CREATE OR REPLACE PROCEDURE disableEvent(_id int(11))
    BEGIN
     UPDATE events SET isDisabled = TRUE WHERE id = _id;
    END;



  CREATE OR REPLACE PROCEDURE setUnReadyEvent(_id int(11))
    BEGIN
      UPDATE events SET ready = FALSE WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE setReadyEvent(_id int(11))
    BEGIN
      UPDATE events SET ready = TRUE WHERE id = _id;
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


  CREATE OR REPLACE PROCEDURE addEventTodo(_eventId int(11), _text longtext, _importance int(1), _expDate datetime)
    BEGIN
      INSERT INTO eventtodoes (event, text, expirationDate, importance) VALUES (_eventId, _text, _expDate, _importance);
    END;

   CREATE OR REPLACE PROCEDURE getEventTodoes(_eventId int(11))
    BEGIN
      SELECT * FROM eventtodoes WHERE event = _eventId
      ORDER BY isSolved, importance;
    END;

  CREATE OR REPLACE PROCEDURE updateEventTodo(_todoId int(11), _text longtext, _importance int(11), _expDate datetime)
    BEGIN
      UPDATE eventtodoes SET text = _text, importance = _importance, expirationDate = _expDate WHERE id = _todoId;
    END;

  CREATE OR REPLACE PROCEDURE setSolvedEventTodo(_todoId int(11))
    BEGIN
      UPDATE eventtodoes SET isSolved = TRUE WHERE id = _todoId;
    END;

   CREATE OR REPLACE PROCEDURE getEventMessages(_eventId int(11))
    BEGIN
      SELECT * FROM eventmessages WHERE event = _eventId
      ORDER BY dateOfSent;
    END;

  CREATE OR REPLACE PROCEDURE addEventMessage(_eventId int(11), _text longtext, _sender int(11))
    BEGIN
      INSERT INTO eventmessages (event, message, sender) VALUES (_eventId, _text, _sender);
    END;