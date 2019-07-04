CREATE OR REPLACE PROCEDURE getGts(_userId int(11))
    BEGIN
        SELECT gts.id, gts.year, gts.tShirtColor, gts.days, gts.members, gts.ready, gts.creater AS createrId, gts.isLocked, gts.greeny, gts.greenyCost, users.name AS creater FROM gts 
        INNER JOIN usergtswitch ON gts.id = usergtswitch.gt
        INNER JOIN users ON gts.creater = users.id
        WHERE usergtswitch.gt = _userId;
    END;

CREATE OR REPLACE PROCEDURE updateGt(_gtId int(11), _year int(4), _tShirtColor varchar(50), _days int(2))
    BEGIN
        UPDATE gts SET year = _year, tShirtColor = _tShirtColor, days = _days WHERE id = _gtId;
    END;

CREATE OR REPLACE PROCEDURE addGt(_year int(4), _creater int(11))
    BEGIN
        INSERT INTO gts(year, creater) VALUES (_year, _creater);
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