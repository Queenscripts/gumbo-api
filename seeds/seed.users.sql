-- first remove any data that may be present
-- TRUNCATE  users RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO users
  (email, password)
  VALUES
    ('test@testing.com', 'test');
  
