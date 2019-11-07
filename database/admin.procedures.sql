CREATE OR REPLACE PROCEDURE getAllEvent()
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
        u2.name AS lastUpdater 
        FROM events
        INNER JOIN users ON events.creater = users.id
        INNER JOIN users u2 ON events.lastUpdater = u2.id;
    END;

CREATE OR REPLACE PROCEDURE getAllGt()
    BEGIN
        SELECT gts.id, gts.year, gts.tShirtColor, gts.days, gts.members, gts.ready, gts.creater AS createrId, gts.isLocked, gts.greeny, gts.greenyCost, users.name AS creater, gts.startDate, gts.lastUpdate, gts.creationDate, gts.lastUpdater AS lastUpdaterId, u2.name AS lastUpdater  FROM gts 
        INNER JOIN users ON gts.creater = users.id
        INNER JOIN users u2 ON gts.lastUpdater = u2.id
        ORDER BY gts.year;
    END;

CREATE OR REPLACE PROCEDURE updateUserRole(_userId INT(11), _roleId INT(11))
    BEGIN
        UPDATE users SET role = _roleId WHERE id = _userId;
    END;

CREATE OR REPLACE PROCEDURE blockUser(_userId INT(11), _status BOOLEAN)
    BEGIN
        UPDATE users SET blocked = _status WHERE id = _userId;
    END;

CREATE OR REPLACE PROCEDURE updateEventArchiveStatus(_eventId INT(11), _status BOOLEAN)
    BEGIN
        UPDATE events SET isDisabled = _status WHERE id = _eventId;
    END;


CREATE OR REPLACE PROCEDURE updateGtArchiveStatus(_gtId INT(11), _status BOOLEAN)
    BEGIN
        UPDATE gts SET isDisabled = _status WHERE id = _gtId;
    END;
 