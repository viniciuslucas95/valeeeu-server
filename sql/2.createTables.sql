CREATE TABLE "user"(
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

create table refresh_token(
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

create table access_token(
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

CREATE TABLE worker_profile(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_worker_profile_id
		UNIQUE(id),
	CONSTRAINT pk_worker_profile
		PRIMARY KEY(id),
	name VARCHAR
		NOT NULL,
	job VARCHAR
		NOT NULL,
	description TEXT,
	user_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_worker_profile_user
		FOREIGN KEY(user_id)
		REFERENCES "user"(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE tag(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_tag_id
		UNIQUE(id),
	CONSTRAINT pk_tag
		PRIMARY KEY(id),
	name VARCHAR
		NOT NULL,
	worker_profile_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_tag_worker_profile
		FOREIGN KEY(worker_profile_id)
		REFERENCES worker_profile(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE customer_profile(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_customer_profile_id
		UNIQUE(id),
	CONSTRAINT pk_customer_profile
		PRIMARY KEY(id),
	name VARCHAR
		NOT NULL,
	user_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_customer_profile_user
		FOREIGN KEY(user_id)
		REFERENCES "user"(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE worker_profile_image(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_worker_profile_image_id
		UNIQUE(id),
	CONSTRAINT pk_worker_profile_image
		PRIMARY KEY(id),
	worker_profile_id VARCHAR(32),
	CONSTRAINT fk_worker_profile_image_worker_profile
		FOREIGN KEY(worker_profile_id)
		REFERENCES worker_profile(id)
		ON DELETE SET NULL
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);