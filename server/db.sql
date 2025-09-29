-- psql -U Postgres => open postgres on cmd line
-- \l => see list of databases
-- \c <database_name> => connect to database
-- \dt => see tables inside database


-- create database
CREATE DATABASE ivai_temple;

-- create table users
-- id automatically updates even while incorrect ops/non-error inducing stuff, also deleting 
-- any row after creating doesn't change up the order of the id or anything it remains same as
-- while creating. 
-- NOT NULL makes sure that the value of the text is literally not NULL, it doesn't prevent it 
-- from being empty string or smth like that.
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create table archana-bookings
CREATE TABLE archana_bookings(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    devotee_name TEXT NOT NULL,
    nakshatra TEXT,
    rasi TEXT,
    gothram TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--register route query
--RETURNING * returns all the affected rows, nowmally INSERT doesn't return anything as it is a 
--write operation, we explicitly use this to display the registered user's details in postman
INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;

--login route query
--We don't use RETURNING * or anything like that SELECT itself is a read operation and it 
--automatically returns the rows affected
SELECT * FROM users WHERE email = $1;

--protect middleware query
SELECT * FROM users where id = $1;

--getMyInfo route query
SELECT name, email FROM users WHERE id = $1;

--createBooking query
INSERT INTO archana_bookings (user_id, devotee_name, nakshatra, rasi, gothram, date) VALUES 
($1, $2, $3, $4, $5, $6) RETURNING *;

--getMyBookings query
SELECT * FROM archana_bookings WHERE user_id = $1;

--editBooking query
UPDATE archana_bookings SET fields = $x WHERE id = $1;

--cancelBooking query
DELETE FROM archana_bookings WHERE id = $1 RETURNING *;
