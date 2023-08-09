CREATE TABLE task(
    id serial PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

