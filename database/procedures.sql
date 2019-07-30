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

/* news */


  CREATE OR REPLACE PROCEDURE getNews()
    BEGIN
      SELECT news.id, news.text, news.date, news.creater AS createrId, users.name AS creater, news.lastUpdate, news.lastUpdater AS lastUpdaterId, u2.name AS lastUpdater FROM news
      INNER JOIN users ON news.creater = users.id
      INNER JOIN users u2 ON news.lastUpdater = u2.id
      ORDER BY news.lastUpdate;
    END;

  CREATE OR REPLACE PROCEDURE deleteNews(_id int(11))
    BEGIN
      DELETE FROM news WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE updateNews(_id int(11), _text text, _updater int(11))
    BEGIN
      UPDATE news SET text = _text, lastUpdater = _updater, lastUpdate = CURRENT_TIMESTAMP WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addNews(_text text, _creater int(11))
    BEGIN
      INSERT INTO news (text, date, creater, lastUpdate, lastUpdater)
  VALUES (_text, NOW(), _creater, NOW(), _creater);
    END;

  /* notification */


CREATE OR REPLACE PROCEDURE getNotifications(_user int(11))
    BEGIN
      SELECT notifications.id, notifications.text, notifications.date, notifications.owner AS ownerId, users.name AS owner FROM notifications
        INNER JOIN users ON notifications.owner = users.id
        WHERE notifications.owner = _user
      ORDER BY notifications.date;
    END;

  CREATE OR REPLACE PROCEDURE addNotification(_text text, _owner int(11))
    BEGIN
      INSERT INTO notifications (text, date, owner)
  VALUES (_text, NOW(), _owner);
  END;

   CALL addNotification('Hello', 1);
