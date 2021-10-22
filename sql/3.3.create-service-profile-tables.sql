CREATE TABLE service_profile(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_service_profile_id
		UNIQUE(id),
	CONSTRAINT pk_service_profile
		PRIMARY KEY(id),
	description VARCHAR
		NOT NULL
		DEFAULT '',
	profile_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_service_profile_profile
		FOREIGN KEY(profile_id)
		REFERENCES profile(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE service_profile_item(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_service_profile_item_id
		UNIQUE(id),
	CONSTRAINT pk_service_profile_item
		PRIMARY KEY(id),
	item VARCHAR
		NOT NULL,
	price DECIMAL
		NOT NULL,
	service_profile_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_service_profile_item_service_profile
		FOREIGN KEY(service_profile_id)
		REFERENCES service_profile(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE service_profile_tag(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_service_profile_tag_id
		UNIQUE(id),
	CONSTRAINT pk_service_profile_tag
		PRIMARY KEY(id),
	tag VARCHAR
		NOT NULL,
	service_profile_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_service_profile_tag_service_profile
		FOREIGN KEY(service_profile_id)
		REFERENCES service_profile(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE service_profile_picture(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_service_profile_picture_id
		UNIQUE(id),
	CONSTRAINT pk_service_profile_picture
		PRIMARY KEY(id),
	picture VARCHAR
		NOT NULL,
	service_profile_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_service_profile_picture_service_profile
		FOREIGN KEY(service_profile_id)
		REFERENCES service_profile(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);