USE csomormaker;
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

    CREATE OR REPLACE PROCEDURE getAccessLevel(_userId int(11))
    BEGIN
        SELECT roles.accessLevel FROM roles
        INNER JOIN users ON users.role = roles.id
        WHERE users.id = _userId;
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
      VALUES(_username, _email, _username, _password);
    END;