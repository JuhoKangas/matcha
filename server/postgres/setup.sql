CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(1000) NOT NULL,
  firstname VARCHAR(1000) NOT NULL,
  lastname VARCHAR(1000) NOT NULL,
	email VARCHAR(1000), 
	password VARCHAR(1000) NOT NULL,
  age INT NOT NULL,
  gender_identity VARCHAR(1000) DEFAULT 'other',
	gender_interest VARCHAR(1000) DEFAULT 'Everyone',
  tags VARCHAR[],
	bio VARCHAR(1000),
	city VARCHAR(1000),
	country VARCHAR(1000),
	actual_location VARCHAR(1000), /* complete this */
	active SMALLINT DEFAULT 0,
	token varchar(255) NOT NULL DEFAULT 0,
	fame INT NOT NULL DEFAULT 0,
	online SMALLINT DEFAULT 0,
	last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	ip VARCHAR(255),
	latitude NUMERIC,
	longitude NUMERIC,
	profile_picture VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS tags (
	id SERIAL NOT NULL PRIMARY KEY,
  tagname VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS photos ( 
	id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL,
	photo VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS chats (
	id SERIAL NOT NULL PRIMARY KEY,
	matcher_user_id VARCHAR(255),
	matcher_user_img VARCHAR(255),
	matcher_user_username VARCHAR(1000),
	recipient_user_id VARCHAR(255),
	recipient_user_img VARCHAR(255),
	recipient_user_username VARCHAR(1000),
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	unread_messages INT DEFAULT 0,
	last_message_text VARCHAR(1000),
	last_message_sender VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS messages (
	id SERIAL NOT NULL PRIMARY KEY,
	chat_id VARCHAR(255),
	sender VARCHAR(255),
	text VARCHAR(1000),
	read SMALLINT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);