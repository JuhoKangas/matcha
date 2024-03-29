const tables = [
  `CREATE TABLE IF NOT EXISTS users (
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
	completed BOOLEAN DEFAULT 'f',
	active SMALLINT DEFAULT 0,
	token varchar(255) NOT NULL DEFAULT 0,
	fame INT NOT NULL DEFAULT 0,
	online SMALLINT DEFAULT 0,
	last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	ip VARCHAR(255),
	latitude NUMERIC,
	longitude NUMERIC,
	profile_picture VARCHAR(1000),
	distance NUMERIC DEFAULT 10000000
);`,

  `CREATE TABLE IF NOT EXISTS tags (
	id SERIAL NOT NULL PRIMARY KEY,
  tagname VARCHAR(255) NOT NULL UNIQUE
);`,

  `CREATE TABLE IF NOT EXISTS photos ( 
	id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL,
	photo VARCHAR(1000)
);`,

  `CREATE TABLE IF NOT EXISTS chats (
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
	last_message_sender INT, 
	show_online INT
);`,

  `CREATE TABLE IF NOT EXISTS messages (
	id SERIAL NOT NULL PRIMARY KEY,
	chat_id VARCHAR(255),
	sender VARCHAR(255),
	text VARCHAR(1000),
	read SMALLINT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,

  `CREATE TABLE IF NOT EXISTS likes (
	id SERIAL NOT NULL PRIMARY KEY,
	user1 INT NOT NULL,
	user2 INT NOT NULL
);`,

  `CREATE TABLE IF NOT EXISTS unlikes (
	id SERIAL NOT NULL PRIMARY KEY,
	user1 INT NOT NULL,
	user2 INT NOT NULL
);`,

  `CREATE TABLE IF NOT EXISTS matches (
	id SERIAL NOT NULL PRIMARY KEY,
	user1 INT NOT NULL,
	user2 INT NOT NULL
);`,

  `CREATE TABLE IF NOT EXISTS notifications (
	id SERIAL NOT NULL PRIMARY KEY,
	sender INT NOT NULL,
	recipient INT NOT NULL,
	message VARCHAR(1000),
	seen BOOLEAN DEFAULT false,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	category VARCHAR(255)
);`,
]

const tableNames = [
  'users',
  'tags',
  'photos',
  'chats',
  'messages',
  'likes',
  'unlikes',
  'matches',
  'notifications',
]

module.exports = { tables, tableNames }
