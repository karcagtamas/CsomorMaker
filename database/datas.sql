USE csomormaker;

INSERT INTO roles (id, name, accessLevel)
  VALUES (1, 'Adminisztrátor', 3),
          (2, 'Moderátor', 2),
          (3, 'Általános felhasználó', 1);

INSERT INTO eventroles (name, accessLevel)
  VALUES ('Fõszervezõ', 3),
          ('Posztfõszervezõ', 2),
          ('Humán', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas', 'karcagtamas@gmail.com', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas2', 'karcagtamas@gmail.cm', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag', 1);

INSERT INTO events (name, isLocked, isDisabled, creater, injured, visitors, visitorLimit, playerCost, visitorCost, playerDeposit, days, startHour, endHour, length, ready)
  VALUES ('24 órás röplabda', FALSE, FALSE, 1, 1, 10, 50, 1500, 500, 500, 1, 12, 12, 24, TRUE);

INSERT INTO usereventswitch (user, event, role)
  VALUES (1, 1, 1);

INSERT INTO eventpayouttypes (name, isOut)
  VALUES ('Kiadás', TRUE),
  ('Bevétel', FALSE);

INSERT INTO eventpayouts (name, eventId, type, cost)
  VALUES ('Torta', 1, 1, 2000);


INSERT INTO eventtodoes (event, text, importance)
  VALUES (1, 'Tortát venni!', 3);

CALL addGt(2019, 1);

CALL gtAccessLevel(4, 1);

