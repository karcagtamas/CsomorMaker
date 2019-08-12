USE csomormaker;

INSERT INTO roles (id, name, accessLevel)
  VALUES (1, 'Adminisztr�tor', 3),
          (2, 'Moder�tor', 2),
          (3, '�ltal�nos felhaszn�l�', 1);

INSERT INTO eventroles (name, accessLevel)
  VALUES ('F�szervez�', 3),
          ('Posztf�szervez�', 2),
          ('Hum�n', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas', 'karcagtamas@gmail.com', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas2', 'karcagtamas@gmail.cm', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag', 1);

CALL addGtMeeting('2019-07-04', 1, 1);