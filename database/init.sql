CREATE TABLE task(
    id serial PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE users(
    id serial PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

