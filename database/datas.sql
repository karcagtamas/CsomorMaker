USE csomormaker;

INSERT INTO roles (id, name, accessLevel)
  VALUES (1, 'Adminisztrátor', 3),
          (2, 'Moderátor', 2),
          (3, 'Általános felhasználó', 1),
          (4, 'Root', 4);

INSERT INTO eventroles (name, accessLevel)
  VALUES ('Főszervező', 4),
          ('Posztfőszervező', 2),
          ('Humán', 1),
          ('Fejlesztő', 3);

INSERT INTO gtroles (name, accessLevel)
  VALUES ('Főszervező', 4),
          ('Posztfőszervező', 2),
          ('Humán', 1),
          ('Fejlesztő', 3);


INSERT INTO users (username, email, password, name, role)
  VALUES ('root', 'csomormaker.karcags.hu', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'ROOT', 4);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas', 'karcagtamas@outlook.com', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas2', 'karcagtamas2@gmail.cm', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag2', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas3', 'karcagtamas3@gmail.cm', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag3', 2);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas4', 'karcagtamas4@gmail.cm', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag4', 3);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas5', 'karcagtamas5@gmail.com', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag5', 1);

-- Áron és Dani profilja

INSERT INTO users (username, email, password, name, role)
  VALUES ('klenovszky.aron', 'aron.klenovszky@gmail.com', '$2y$10$mHgXq3/mFDN9Ysdq0Vpn4OoKJCd3pUXKtQCM68n0XAtxkzGlEMKBu', 'Kleno', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('szabo.daniel', 'szabodaniel35@gmail.com', '$2y$10$Lp2yV2l4cJOkqij76LjqzuefWwZwSfS6EHPKU8HCf4uIs3p8HJj6q', 'Dani', 1);

-- Fent levő jelenlegi hírek

INSERT INTO news(id, text, date, creater, lastUpdate, lastUpdater)
  VALUES (1, 'Frissítések:

- 2019.07.28. - Hír portál
- 2019.07.30. - Értesítések
- 2019.08.12. - Gt gyűlések, Gt DÖK bemutatás', '2019-07-31 10:12:55', 1, '2019-08-19 17:07:33', 1),
(2, 'Az oldal folyamatos fejlesztés alatt áll. Ha bárkinek van valamilyen észrevétele vagy innovációs ötlete, az kérem jelezze az oldal felé a következő e-mail címen: karcagtamas@karcags.hu 

A kérdések és a válaszok oldal a gólyatábor felületen még nincsen használható állapotban, szóval az üres képernyő okkal üres.

Előre is köszönöm a segítséget és a megértést :)', '2019-10-16 11:24:51', 1, '2019-10-16 11:27:18', 1);

INSERT INTO news (text, date, creater, lastUpdate, lastUpdater)
   VALUES ('', '', 1, '', 1);

INSERT INTO events(name, isLocked, isDisabled, creater, injured, visitors, visitorLimit, playerCost, visitorCost, playerDeposit, days, startHour, endHour, length, startDate, lastUpdater)
    VALUES ('24h Foci bajnokság', FALSE, FALSE, 2, 4, 30, 100, 10000, 2000, 2000, 1, 17, 17, 24, '2019-12-12', 2);

INSERT INTO usereventswitch(user, event, role)
    VALUES (2, 1, 1), (3, 1, 2),(4, 1, 3);

INSERT INTO eventpayouttypes(name, isOut)
    VALUES ('Kifizetés', TRUE), ('Befizetés', FALSE);

INSERT INTO eventpayouts(name, eventId, type, cost, source, destination)
    VALUES ('Torta1', 1, 1, 10000, 'Tomi', 'Zsuzsi'),
           ('Torta2', 1, 2, 3000, 'Tomi', 'Viktor');

INSERT INTO eventtodoes(event, text, importance, isSolved, expirationDate)
    VALUES (1, 'Tortát venni', 1, FALSE, '2019-10-10'),
           (1, 'Több torta', 2, TRUE, '2019-10-23'),
           (1, 'Még, még', 2, FALSE, '2019-12-12'),
           (1, 'Talán ez', 3, FALSE, '2020-01-01');

INSERT INTO eventmessages(sender, event, message)
    VALUES (1, 1, 'Hello'),
           (2, 1, 'Hello'),
           (3, 1, 'Hello'),
           (4, 1, 'Hello'),
           (5, 1, 'Hello');
