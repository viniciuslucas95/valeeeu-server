CREATE TABLE refresh_token(
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
		DEFAULT false,
	account_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_refresh_token_account
		FOREIGN KEY(account_id)
		REFERENCES account(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE access_token(
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
		DEFAULT false,
	refresh_token_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_access_token_refresh_token
		FOREIGN KEY(refresh_token_id)
		REFERENCES refresh_token(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);