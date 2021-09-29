CREATE TABLE "user" (
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_user_id
		UNIQUE(id),
	CONSTRAINT pk_user
		PRIMARY KEY(id),
	email VARCHAR
		NOT NULL,
	CONSTRAINT unique_user_email
		UNIQUE(email),
	password VARCHAR
		NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

create table refresh_token (
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_refresh_token_id
		UNIQUE(id),
	CONSTRAINT pk_refresh_token
		PRIMARY KEY(id),
	token VARCHAR
		NOT NULL,
	CONSTRAINT unique_refresh_token_token
		UNIQUE(token),
	is_forbidden BOOLEAN
		NOT NULL
		DEFAULT FALSE,
	user_id VARCHAR(32),
	CONSTRAINT fk_refresh_token_user
		FOREIGN KEY(user_id)
		REFERENCES "user"(id)
		ON DELETE SET NULL
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

create table access_token (
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_access_token_id
		UNIQUE(id),
	CONSTRAINT pk_access_token
		PRIMARY KEY(id),
	token VARCHAR
		NOT NULL,
	CONSTRAINT unique_access_token_token
		UNIQUE(token),
	is_forbidden BOOLEAN
		NOT NULL
		DEFAULT FALSE,
	refresh_token_id VARCHAR(32),
	CONSTRAINT fk_access_token_refresh_token
		FOREIGN KEY(refresh_token_id)
		REFERENCES refresh_token(id)
		ON DELETE SET NULL
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);