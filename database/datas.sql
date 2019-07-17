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

INSERT INTO events (name, isLocked, isDisabled, creater, injured, visitors, visitorLimit, playerCost, visitorCost, playerDeposit, days, startHour, endHour, length, ready)
  VALUES ('24 �r�s r�plabda', FALSE, FALSE, 1, 1, 10, 50, 1500, 500, 500, 1, 12, 12, 24, TRUE);

INSERT INTO usereventswitch (user, event, role)
  VALUES (1, 1, 1);

INSERT INTO eventpayouttypes (name, isOut)
  VALUES ('Kiad�s', TRUE),
  ('Bev�tel', FALSE);

INSERT INTO eventpayouts (name, eventId, type, cost)
  VALUES ('Torta', 1, 1, 2000);


INSERT INTO eventtodoes (event, text, importance)
  VALUES (1, 'Tort�t venni!', 3);

CALL addGt(2019, 1);

CALL gtAccessLevel(4, 1);

