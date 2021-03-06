USE csomormaker;
  CREATE OR REPLACE PROCEDURE getHash(_username varchar(50))
    BEGIN
      SELECT password AS hash, id AS userId FROM users
        WHERE username = _username AND NOT blocked;
    END;

  CREATE OR REPLACE PROCEDURE getHashById(_userId varchar(50))
    BEGIN
      SELECT password AS hash FROM users
        WHERE id = _userId AND NOT blocked;
    END;
  
  CREATE OR REPLACE PROCEDURE isAdmin(_userId int(11))
    BEGIN
      DECLARE level int(1) DEFAULT -1;
      DECLARE roleId int(11);
      SELECT role INTO roleId FROM users WHERE id = _userId AND NOT blocked;
      SELECT accessLevel INTO level FROM roles WHERE id = roleId;
      IF level = 3 OR level = 4
        THEN SELECT TRUE AS isAdmin;
        ELSE SELECT FALSE AS isAdmin;
        END IF;
    END;

  CREATE OR REPLACE PROCEDURE isValidUsernameAndEmail(_username varchar(100), _email varchar(255))
    BEGIN
      DECLARE countOf int(11) DEFAULT 0;
      SELECT COUNT(*) INTO countOf FROM users WHERE username = _username AND email = _email AND NOT blocked;
    IF countOf = 1
      THEN SELECT id AS userId, TRUE AS isValid FROM users WHERE username = _username AND email = _email;
      ELSE SELECT FALSE AS isValid;
      END IF;
    END;

    CREATE OR REPLACE PROCEDURE getAccessLevel(_userId int(11))
    BEGIN
        SELECT roles.accessLevel FROM roles
        INNER JOIN users ON users.role = roles.id
        WHERE users.id = _userId;
    END;

  CREATE OR REPLACE PROCEDURE getUsers()
    BEGIN
     SELECT users.id, users.name, users.username, users.email, users.role AS roleId, roles.name AS role, users.tShirtSize, users.allergy, users.lastLogin, users.class, users.registrationTime, users.blocked FROM users 
     INNER JOIN roles ON users.role = roles.id
     WHERE roles.accessLevel <> 4;
    END;

  CREATE OR REPLACE PROCEDURE getUser(_id int(11))
    BEGIN
     SELECT users.id, users.name, users.username, users.email, users.role AS roleId, roles.name AS role, users.tShirtSize, users.allergy, users.lastLogin, users.class, users.registrationTime, users.blocked FROM users 
     INNER JOIN roles ON users.role = roles.id
     WHERE users.id = _id AND NOT blocked;
    END;


  CREATE OR REPLACE PROCEDURE updateUser(_id int(11), _name varchar(100), _tShirtSize varchar(6), _allergy text, _class varchar(10))
    BEGIN
     UPDATE users SET name = _name, tShirtSize = _tShirtSize, allergy = _allergy, class = _class WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE deleteUser(_id int(11))
    BEGIN
     DELETE FROM users WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE addUser(_username varchar(100), _email varchar(255), _password varchar(100))
    BEGIN
     INSERT INTO users(username, email, name, password)
      VALUES(_username, _email, _username, _password);
    END;

  CREATE OR REPLACE PROCEDURE changePassword(_id int(11), _password varchar(100))
    BEGIN
     UPDATE users SET password = _password WHERE id = _id;
    END;

  CREATE OR REPLACE PROCEDURE login(_userId int(11))
    BEGIN
    UPDATE users SET lastLogin = NOW() WHERE id = _userId;
    END;