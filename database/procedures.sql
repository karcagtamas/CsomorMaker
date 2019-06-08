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

  CREATE OR REPLACE PROCEDURE getEvent(_id int(11))
    BEGIN
     SELECT * FROM events
      WHERE NOT events.isLocked AND events.id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addEvents(_name varchar(50), _creater int(11))
    BEGIN
     INSERT INTO events (name, creater)
      VALUES (_name, _creater);
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

