CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(1000) NOT NULL,
  firstname VARCHAR(1000) NOT NULL,
  lastname VARCHAR(1000) NOT NULL,
	email VARCHAR(1000), 
	password VARCHAR(1000) NOT NULL,
  age INT NOT NULL,
  gender_identity VARCHAR(1000) NOT NULL,
	gender_interest VARCHAR(1000) DEFAULT 'Everyone',
  tags INT NOT NULL,
	bio VARCHAR(1000) DEFAULT 'none',
	city VARCHAR(1000),
	country VARCHAR(1000),
	actual_location VARCHAR(1000), /* complete this */
	active SMALLINT DEFAULT 0,
	token varchar(255) NOT NULL DEFAULT 0,
	fame INT NOT NULL DEFAULT 0,
	online SMALLINT DEFAULT 0,
	last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  testing INT
)
