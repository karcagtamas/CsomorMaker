USE csomormaker;

INSERT INTO roles (id, name, accessLevel)
  VALUES (1, 'Adminisztr�tor', 3),
          (2, 'Moder�tor', 2),
          (3, '�ltal�nos flehaszn�l�', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas', 'karcagtamas@gmail.com', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag', 1);

INSERT INTO events (name, isLocked, isDisabled, creater, currentPlayers, playerLimit, injured, visitors, visitorLimit, playerCost, visitorCost, playerDeposit, days, startHour, endHour, length, ready)
  VALUES ('24 �r�s r�plabda', FALSE, FALSE, 1, 110, 150, 1, 10, 50, 1500, 500, 500, 1, 12, 12, 24, TRUE);

INSERT INTO usereventswitch (user, event)
  VALUES (1, 1);

INSERT INTO payouttypes (name, isOut)
  VALUES ('Kiad�s', TRUE),
  ('Bev�tel', FALSE);

INSERT INTO payouts (name, eventId, type, cost)
  VALUES ('Torta', 1, 1, 2000);

INSERT INTO bosses (user, event)
  VALUES (1, 1);

INSERT INTO todoes (eventId, text)
  VALUES (1, 'Tort�t venni!');

