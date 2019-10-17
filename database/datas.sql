USE csomormaker;

INSERT INTO roles (id, name, accessLevel)
  VALUES (1, 'Adminisztrátor', 3),
          (2, 'Moderátor', 2),
          (3, 'Általános felhasználó', 1);

INSERT INTO eventroles (name, accessLevel)
  VALUES ('Főszervező', 3),
          ('Posztfőszervező', 2),
          ('Humán', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas', 'karcagtamas@gmail.com', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas2', 'karcagtamas@gmail.cm', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag2', 1);

INSERT INTO users (username, email, password, name, role)
  VALUES ('karcagtamas5', 'karcagtamas5@gmail.com', '$2y$10$H/hBwhyOF8pfqTwugvkCreTRVP7olOOPTLr2ACkH6OescL0FLc2/S', 'Karcag5  ', 1);
