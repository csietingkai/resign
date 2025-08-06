CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_info (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_name VARCHAR NOT NULL,
	signed BOOLEAN NOT NULL DEFAULT true,
	max_stamp_cnt integer NOT NULL DEFAULT 100,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	name VARCHAR NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS coworker (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	organization_id uuid NOT NULL,
	name VARCHAR NOT NULL,
	ename VARCHAR NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_organization_id FOREIGN KEY (organization_id) REFERENCES organization(id)
);

CREATE TABLE IF NOT EXISTS stamp_card (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_name VARCHAR NOT NULL,
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