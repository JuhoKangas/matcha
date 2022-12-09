CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(1000) NOT NULL,
  firstname VARCHAR(1000) NOT NULL,
  lastname VARCHAR(1000) NOT NULL,
  age INT NOT NULL,
)

INSERT INTO users(username, firstname, lastname, age) VALUES ('juhok', 'juho', 'kangas', 31);