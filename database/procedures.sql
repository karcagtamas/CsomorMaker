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
     SELECT events.* FROM events
      INNER JOIN usereventswitch ON events.id = usereventswitch.event
      WHERE NOT events.isDisabled AND user = _userId;
    END;

  CREATE OR REPLACE PROCEDURE getEvent(_id int(11))
    BEGIN
     SELECT * FROM events
      WHERE NOT events.isLocked AND events.id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addEvents(_name varchar(50), _creater int(11))
    BEGIN
     INSERT INTO events (name, creater)
      VALUES (_name, _creater);

     CALL addUserToEvent(_creater, LAST_INSERT_ID());
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
      visitorsCost = _visitorCost,
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

  CREATE OR REPLACE PROCEDURE getEventUsers(_id int(11))
    BEGIN
     SELECT users.id, users.username, users.email, users.name, users.role FROM users
      INNER JOIN usereventswitch ON users.id = usereventswitch.user
      WHERE usereventswitch.event = _id;
    END;

  CREATE OR REPLACE PROCEDURE addBossToEvent(_userId int(11), _eventId int(11))
    BEGIN
     INSERT INTO bosses (user, event)
      VALUES (_userId, _eventId);
    END;

  /* Users */

  CREATE OR REPLACE PROCEDURE getUsers()
    BEGIN
     SELECT * FROM users;
    END;

  CREATE OR REPLACE PROCEDURE getUser(_id int(11))
    BEGIN
     SELECT * FROM users WHERE id = _id;
    END;
  
  CREATE OR REPLACE PROCEDURE getEventUsers(_eventId int(11))
    BEGIN
     SELECT users.* FROM users
      INNER JOIN usereventswitch ON users.id = usereventswitch.user
      WHERE usereventswitch.event = _eventId;
    END;


  CREATE OR REPLACE PROCEDURE updateUser(_id int(11), _name varchar(100))
    BEGIN
     SELECT * FROM users WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE deleteUser(_id int(11))
    BEGIN
     DELETE FROM users WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addUser(_username varchar(100), _email varchar(255))
    BEGIN
     INSERT INTO users(username, email, name)
      VALUES(_username, _email, _email);
    END;

  CREATE OR REPLACE PROCEDURE addUserToEvent(_userId int(11), _eventId int(11))
    BEGIN
     INSERT INTO usereventswitch(user, event)
      VALUES(_userId, _eventId);
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
     SELECT * FROM payouts WHERE eventId = _eventId;
    END;

  CREATE OR REPLACE PROCEDURE getPayOut(_id int(11))
    BEGIN
     SELECT * FROM payouts WHERE id = _id;
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

  CREATE OR REPLACE PROCEDURE getWork(id int(11))
    BEGIN
     SELECT * FROM works WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE deleteWork(_id int(11))
    BEGIN
     DELETE FROM works WHERE id = _id;
    END;