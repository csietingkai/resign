CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_setting (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id uuid NOT NULL,
	pwd_changed BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS coworker (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	dept VARCHAR NOT NULL,
	name VARCHAR NOT NULL,
	ename VARCHAR NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	hired BOOLEAN NOT NULL DEFAULT true,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS stamp_card (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id uuid NOT NULL,
	point integer NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS stamp_card_record (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	card_id uuid NOT NULL,
	date TIMESTAMP NOT NULL,
	coworker_id uuid NOT NULL,
	point integer NOT NULL DEFAULT 1,
	description VARCHAR NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_card_id FOREIGN KEY (card_id) REFERENCES stamp_card(id),
	CONSTRAINT fk_coworker_id FOREIGN KEY (coworker_id) REFERENCES coworker(id)
);