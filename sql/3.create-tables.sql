CREATE TABLE account(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_account_id
		UNIQUE(id),
	CONSTRAINT pk_account
		PRIMARY KEY(id),
	email VARCHAR
		NOT NULL,
	CONSTRAINT unique_account_email
		UNIQUE(email),
	password VARCHAR
		NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);