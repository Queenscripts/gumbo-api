CREATE TABLE userrecipes (
  id SERIAL PRIMARY KEY,
  thumbnail TEXT,
  title TEXT NOT NULL,
  ingredients TEXT,
  recipeurl VARCHAR(2083)
);
