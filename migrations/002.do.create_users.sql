CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,

  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);

